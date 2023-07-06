import { spawn, spawnSync } from "child_process";

const spawnPromise = (command, args) => {
  return new Promise((resolve, reject) => {
    try {
      const instance = spawn(command, args);

      instance.stdout.on("data", (data) => {
        process.stdout.write(data);
      });

      instance.stderr.on("data", (data) => {
        process.stderr.write(data);
        reject(-1);
      });

      instance.on("close", (code) => {
        resolve(code);
      });
    } catch (e) {
      console.error(e);
      reject(-1);
    }
  });
};

async function chain(reverseComands) {
  const commands = reverseComands.reverse();
  while (commands.length) {
    const [command, args = []] = commands.pop();
    await spawnPromise(command, args);
    // if (code === "runtime-error") {
    //   console.error(
    //     `Error with code ${code} while executing ${command} ${args.join(" ")}`
    //   );
    //   break;
    // }
  }
}

async function run() {
  const commands = [
    ["npm", ["run", "build:lib"]],
    ["git", ["add", "--all"]],
    ["git", ["commit", "-m", "'build:lib'"]],
    ["git", ["push"]],
    ["npm", ["version", "patch"]],
    ["npm", ["publish"]],
  ];

  while (commands.length) {
    const [command, args = []] = commands.pop();
    const { error, stdout } = spawnSync(command, args);
    if (error) {
      console.error(error);
      break;
    } else {
      process.stdout.write(stdout);
    }
  }

  // const result = spawnSync("npm", ["run", "build:lib"]);
  // console.log({ result });
  // spawnSync(["git", ["add", "--all"]]);
  // spawnSync(["git", ["commit", "-m", "'build:lib'"]]);
  // spawnSync(["git", ["push"]]);
  // spawnSync(["npm", ["version", "patch"]]);
  // spawnSync(["npm", ["publish"]]);
  // chain([
  //   ["npm", ["run", "build:lib"]],
  //   ["git", ["add", "--all"]],
  //   ["git", ["commit", "-m", "'build:lib'"]],
  //   ["git", ["push"]],
  //   ["npm", ["version", "patch"]],
  //   ["npm", ["publish"]],
  // ]);
}

run();
