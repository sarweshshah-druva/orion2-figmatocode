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
    options: {
      storySort: (a, b) => {
        const aTitle = a.title || "";
        const bTitle = b.title || "";
        
        // Split titles by '/' to get path segments
        const aParts = aTitle.split("/");
        const bParts = bTitle.split("/");
        
        // Count depth (number of segments)
        const aDepth = aParts.length;
        const bDepth = bParts.length;
        
        // Determine if it's a folder (3+ segments) or independent component (2 segments)
        const aIsFolder = aDepth >= 3;
        const bIsFolder = bDepth >= 3;
        
        // Folders first (aIsFolder=true comes before bIsFolder=false)
        if (aIsFolder !== bIsFolder) {
          return aIsFolder ? -1 : 1;
        }
        
        // If same type (both folders or both independent), sort alphabetically
        return aTitle.localeCompare(bTitle);
      },
    },
  },
};

export default preview;
