import { createHash } from "node:crypto";
import { copyFileSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const buttonsDirectory = fileURLToPath(new URL("../public/buttons/", import.meta.url));
const files = {
  GITHUB_BUTTON: "github-button.png",
  TRYHACKME_BUTTON: "tryhackme-button.png",
};

const generated = Object.entries(files).map(([constant, filename]) => {
  const sourcePath = fileURLToPath(new URL(`../public/buttons/${filename}`, import.meta.url));
  const hash = createHash("sha256").update(readFileSync(sourcePath)).digest("hex").slice(0, 12);
  const hashedFilename = filename.replace(".png", `.${hash}.png`);
  const hashedPath = fileURLToPath(new URL(`../public/buttons/${hashedFilename}`, import.meta.url));
  const staleCopies = new RegExp(`^${filename.replace(".png", "").replace("-", "\\-")}\\.[a-f0-9]{12}\\.png$`);

  for (const existingFilename of readdirSync(buttonsDirectory)) {
    if (existingFilename !== hashedFilename && staleCopies.test(existingFilename)) {
      unlinkSync(fileURLToPath(new URL(`../public/buttons/${existingFilename}`, import.meta.url)));
    }
  }

  copyFileSync(sourcePath, hashedPath);
  return [
    `export const ${constant}_HASH = "${hash}";`,
    `export const ${constant}_SRC = "/buttons/${hashedFilename}";`,
  ].join("\n");
});

writeFileSync(
  fileURLToPath(new URL("../src/button-hashes.generated.ts", import.meta.url)),
  `${generated.join("\n\n")}\n`,
);
