import fs from "fs";
import path from "path";

const PRISMA_PATH = "prisma/schema.prisma";
const REPLACE_DBS = ["postgres", "mysql"];
const SQLITE_DB_NAME = '"file:./dev.db"';
const OUT_PATH = "prisma/_sqlite/schema.prisma";

// create directories on the way if they dont exist
function writeFileSyncRecursive(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
}

async function run() {
  const cwd = process.cwd();
  const prismaPath = path.join(cwd, PRISMA_PATH);
  const prisma = fs.readFileSync(prismaPath, "utf8");

  const lines = prisma
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean) // Remove empty lines
    .filter((l) => !l.startsWith("//")); // Remove comments

  const transformed = lines
    .map((line) => {
      const tokens = line.split(" ").filter(Boolean);
      // Set the provider to sqlite
      if (
        tokens[0] === "provider" &&
        REPLACE_DBS.includes(tokens[2].replace(/"/g, ""))
      ) {
        tokens[2] = '"sqlite"';
      }
      // Set the url to a file
      if (tokens[0] === "url") {
        tokens[2] = SQLITE_DB_NAME;
      }

      return tokens.join(" ");
    })
    .join("\n");

  const outPath = path.join(cwd, OUT_PATH);
  writeFileSyncRecursive(outPath, transformed);
}

run();
