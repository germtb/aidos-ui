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
      console.error(`Error while executing ${command} ${args.join(" ")}`);
      break;
    }
  }
}

async function run() {
  // const result = await spawnPromise("npm version patch");
  chain([
    ["git", ["add", "--all"]],
    ["git", ["commit", "-m", "'minor version update'"]],
    ["npm", ["version", "patch"]],
    // ["npm"[("version", "patch")]],
  ]);
}

run();
