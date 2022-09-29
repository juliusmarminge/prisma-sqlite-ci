import github from "@actions/github";
import core from "@actions/core";

import path from "path";

async function run() {
  const myToken = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(myToken);

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: "octokit",
    repo: "rest.js",
    pull_number: 123,
    mediaType: {
      format: "diff",
    },
  });

  console.log(pullRequest);

  console.log("Current path", path.resolve());
  console.log("Current directory", process.cwd());
  console.log("Directory contents", fs.readdirSync(process.cwd()));
}

run();
