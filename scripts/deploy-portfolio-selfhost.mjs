import { spawnSync } from "node:child_process";
import { chmodSync, rmSync } from "node:fs";

const INFISICAL_PROJECT_ID = "a44cf856-7504-4b5d-8562-b2a033cbd61c";
const INFISICAL_ENVIRONMENT = "prod";
const INFISICAL_PATH = "/open-seo";
const DEPLOY_ENV_FILE = ".env.selfhost";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} exited with status ${result.status ?? "unknown"}`,
    );
  }
}

try {
  run(
    "infisical",
    [
      "export",
      "--projectId",
      INFISICAL_PROJECT_ID,
      "--env",
      INFISICAL_ENVIRONMENT,
      "--path",
      INFISICAL_PATH,
      "--format",
      "dotenv",
      "--output-file",
      DEPLOY_ENV_FILE,
      "--silent",
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );

  chmodSync(DEPLOY_ENV_FILE, 0o600);
  run("pnpm", ["deploy:selfhost", "--yes"]);
} finally {
  rmSync(DEPLOY_ENV_FILE, { force: true });
}
