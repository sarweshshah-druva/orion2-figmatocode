import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Only run story tests when addon runs (avoids running story tests in normal vitest run)
const isStorybookVitest = process.env.VITEST_STORYBOOK === "true";

// Match addon's project filter: "storybook:" + normalize(configDir) (addon sets STORYBOOK_CONFIG_DIR)
const storybookProjectName = `storybook:${
  process.env.STORYBOOK_CONFIG_DIR ??
  path.normalize(path.join(dirname, ".storybook"))
}`;

const storybookPlugins = isStorybookVitest
  ? await storybookTest({
      configDir: path.join(dirname, ".storybook"),
    })
  : [];

export default defineConfig({
  test: {
    name: storybookProjectName,
    include: isStorybookVitest ? ["**/*.stories.@(js|jsx|mjs|ts|tsx)"] : [],
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    plugins: storybookPlugins,
  },
});
