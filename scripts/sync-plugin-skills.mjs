#!/usr/bin/env node
// The legacy file and package command names remain for compatibility. The
// canonical product skills already live in plugins/openseo/skills. Validate
// them in place so CI cannot delete shipped workflows or depend on a separate
// repository-guidance tree.
import { lstatSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const skillsDir = join(repoRoot, "plugins/openseo/skills");

const expectedSkills = [
  "competitive-landscape",
  "competitor-analysis",
  "keyword-clustering",
  "keyword-research",
  "link-prospecting",
  "local-seo",
  "seo-audit",
  "seo-coach",
  "seo-project-setup",
];

const failures = [];
const actualSkills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (
  JSON.stringify(actualSkills) !== JSON.stringify([...expectedSkills].sort())
) {
  failures.push(
    `Expected product skills ${expectedSkills.join(", ")}; found ${actualSkills.join(", ")}`,
  );
}

function validateRealFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    const entryStat = lstatSync(entryPath);

    if (entryStat.isSymbolicLink()) {
      failures.push(
        `${relative(repoRoot, entryPath)} must be a real file or directory`,
      );
      continue;
    }

    if (entryStat.isDirectory()) {
      validateRealFiles(entryPath);
    }
  }
}

for (const skill of expectedSkills) {
  const skillDir = join(skillsDir, skill);
  const skillFile = join(skillDir, "SKILL.md");

  try {
    if (!lstatSync(skillDir).isDirectory()) {
      failures.push(`${relative(repoRoot, skillDir)} must be a directory`);
      continue;
    }
    if (!lstatSync(skillFile).isFile()) {
      failures.push(`${relative(repoRoot, skillFile)} must be a regular file`);
      continue;
    }
    validateRealFiles(skillDir);
  } catch (error) {
    failures.push(`${relative(repoRoot, skillDir)}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("OpenSEO product skill validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${expectedSkills.length} canonical product skills in plugins/openseo/skills/`,
  );
}
