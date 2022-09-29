import github from "@actions/github";
import core from "@actions/core";
import fs from "fs";
import path from "path";

const PRISMA_PATH = "prisma/schema.prisma";

async function run() {
  const cwd = process.cwd();
  const prismaPath = path.join(cwd, PRISMA_PATH);
  const prisma = fs.readFileSync(prismaPath, "utf8");

  // Remove spaces
  const lines = prisma
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean) // Remove empty lines
    .filter((l) => !l.startsWith("//")); // Remove comments

  console.log(lines);

  // Find datasource block
  const datasource = prisma.match(/datasource db \{[^}]*\}/g)[0];
  console.log(datasource);

  // Replace `provider = "postgres" with `provider = "sqlite"`
  const provider = datasource.match(/provider( +)=( +)"[^"]*"/g)[0];
  const newProvider = provider.replace("sqlite", "postgresql");

  // Replace `url = ...` with `url = "file:./dev.db"`. Note that
  // there can be multiple spaces between `url` and `=`. We
  // replace the first occurrence of `=` with `= "file:./dev.db"`.
  const url = datasource.match(/url( +)=( +)"[^"]*"/g);
  console.log(url);
  // const newUrl = url.replace("=", ' = "file:./dev.db"');

  // Replace datasource block
  const newDatasource = datasource.replace(provider, newProvider);
  //.replace(url, newUrl);

  // // Replace prisma file
  const newPrisma = prisma.replace(datasource, newDatasource);
  // fs.writeFileSync(prismaPath, newPrisma);

  console.log("Prisma file updated");
  console.log(newPrisma);
}

run();
