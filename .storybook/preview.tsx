import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/tokens/css-variables.css";
import "../src/index.css";
import "./preview-canvas.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: "light",
        Dark: "dark",
      },
      defaultTheme: "Light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    // Disable built-in backgrounds addon so our theme (preview-canvas.css) controls
    // Canvas and Docs canvas; addon would inject fixed colors with !important.
    backgrounds: { disable: true },
  },
};

export default preview;
