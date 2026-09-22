import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const lastUpdated = execFileSync("git", ["log", "-1", "--date=short", "--format=%cd"], {
  cwd: root,
  encoding: "utf8",
}).trim();

writeFileSync(
  fileURLToPath(new URL("../src/last-updated.generated.ts", import.meta.url)),
  `export const LAST_UPDATED = "${lastUpdated}";\n`,
);
