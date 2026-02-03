import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplitButton } from "./SplitButton";
import type { SplitButtonVariant, SplitButtonSize } from "./SplitButton.types";

const meta = {
  id: "components-buttons-split-button",
  title: "Components/Buttons/Split Button",
  component: SplitButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Split button with main action (label) and dropdown trigger (chevron). Variants: primary (filled), secondary (outlined). Sizes: small, medium, large. Built from Figma: Orion v2.0 (node 67-2932).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"] as SplitButtonVariant[],
      description: "Visual style",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"] as SplitButtonSize[],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    label: {
      control: "text",
      description: "Main action label",
    },
    dropdownAriaLabel: {
      control: "text",
      description: "Accessible label for dropdown trigger",
    },
  },
} satisfies Meta<typeof SplitButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Label",
    variant: "primary",
    size: "medium",
    disabled: false,
    dropdownAriaLabel: "Open menu",
    onMainClick: () => {},
    onDropdownClick: () => {},
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    disabled: true,
  },
};

export const PrimaryLarge: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    variant: "primary",
    size: "large",
  },
};

export const SecondarySmall: Story = {
  args: {
    ...Primary.args,
    label: "Label",
    variant: "secondary",
    size: "small",
  },
};
