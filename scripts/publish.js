import { spawnSync } from "child_process";

async function run() {
  const commands = [
    ["npm", ["run", "build:lib"]],
    ["git", ["add", "--all"]],
    ["git", ["commit", "-m", "'build:lib'"]],
    ["npm", ["version", "patch"]],
    ["npm", ["publish"]],
    ["git", ["push"]],
  ].reverse();

  while (commands.length) {
    const [command, args = []] = commands.pop();
    console.log(`Executing ${command} ${args.join(" ")}`);
    const { error, stdout } = spawnSync(command, args);

    if (error) {
      console.error(error);
      break;
    } else {
      process.stdout.write(stdout);
    }
  }
}

run();
