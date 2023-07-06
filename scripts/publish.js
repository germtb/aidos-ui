import { spawn } from "child_process";

const spawnPromise = (command, args) => {
  return new Promise((resolve, reject) => {
    try {
      const instance = spawn(command, args);

      instance.stdout.on("data", (data) => {
        process.stdout.write(data);
      });

      instance.stderr.on("data", (data) => {
        process.stdout.write(data);
        reject(-1);
      });

      instance.on("close", (code) => {
        resolve(code);
      });
    } catch (e) {
      reject(-1);
    }
  });
};

async function chain(reverseComands) {
  const commands = reverseComands.reverse();
  while (commands.length) {
    const [command, args = []] = commands.pop();
    const code = await spawnPromise(command, args).catch(() => -1);
    if (code !== 0) {
      console.error(
        `Error with code ${code} while executing ${command} ${args.join(" ")}`
      );
      break;
    }
  }
}

async function run() {
  chain([
    ["npm", ["run", "build:lib"]],
    ["git", ["add", "--all"]],
    ["git", ["commit", "-m", "'build:lib'"]],
    ["git", ["push"]],
    ["npm", ["version", "patch"]],
    ["npm", ["publish"]],
  ]);
}

run();
