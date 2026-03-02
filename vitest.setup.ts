import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { setProjectAnnotations } from "@storybook/react";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";

expect.extend(matchers);

setProjectAnnotations([a11yAddonAnnotations]);

afterEach(() => {
  cleanup();
});
