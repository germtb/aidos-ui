import { spawnSync } from "child_process";

async function run() {
  const commands = [
    ["npm", ["run", "build:lib"]],
    ["npm", ["version", "patch"]],
    ["npm", ["publish"]],
    ["git", ["push"]],
  ].reverse();

  while (commands.length) {
    const [command, args = []] = commands.pop();
    console.log(`Executing ${command} ${args.join(" ")}`);
    const { error, status } = spawnSync(command, args, { stdio: "inherit" });

    if (error || status !== 0) {
      if (error) console.error(error);
      process.exitCode = status ?? 1;
      break;
    }
  }
}

run();
