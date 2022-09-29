import github from "@actions/github";
import core from "@actions/core";

import path from "path";

async function run() {
  console.log("Current path", path.resolve());
  console.log("Current directory", process.cwd());
  console.log("Directory contents", fs.readdirSync(process.cwd()));
}

run();
