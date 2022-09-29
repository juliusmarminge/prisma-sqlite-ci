import github from "@actions/github";
import core from "@actions/core";
import fs from "fs";
import path from "path";

const PRISMA_PATH = "prisma/schema.prisma";

async function run() {
  const cwd = process.cwd();
  const prismaPath = path.join(cwd, PRISMA_PATH);
  const prisma = fs.readFileSync(prismaPath, "utf8");

  // Find datasource block
  const datasource = prisma.match(/datasource db \{[^}]*\}/g)[0];
  console.log(datasource);
}

run();
