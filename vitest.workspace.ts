import { defineWorkspace } from "vitest/config";

// Root config (unit tests) + Storybook project for @storybook/addon-vitest
export default defineWorkspace([".", "./vitest.storybook.config.ts"]);
