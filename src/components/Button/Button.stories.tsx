import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "./Button";
import type { ButtonVariant, ButtonSize } from "./Button.types";

const NON_ICON_KEYS = new Set(["createLucideIcon", "LucideIcon", "IconNode"]);

const LUCIDE_ICON_NAMES = (
  Object.keys(LucideIcons) as Array<keyof typeof LucideIcons>
)
  .filter(
    (key): key is keyof typeof LucideIcons =>
      !NON_ICON_KEYS.has(key) &&
      LucideIcons[key] != null &&
      !key.endsWith("Icon")
  )
  .sort();

const ICON_OPTIONS = LUCIDE_ICON_NAMES as readonly string[];
type IconName = (typeof LUCIDE_ICON_NAMES)[number];

function getLucideIcon(
  name: string
): React.ComponentType<{ size?: number }> | null {
  const raw = LucideIcons[name as keyof typeof LucideIcons];
  const rawWithDefault = raw as unknown as {
    default?: React.ComponentType<{ size?: number }>;
  };
  const component =
    raw != null && typeof rawWithDefault?.default === "function"
      ? rawWithDefault.default
      : raw;
  return component != null &&
    (typeof component === "function" ||
      (typeof component === "object" && "$$typeof" in component))
    ? (component as React.ComponentType<{ size?: number }>)
    : null;
}

const SIZE_ICON_PX: Record<ButtonSize, number> = {
  small: 14,
  medium: 16,
  large: 18,
};

export interface ButtonStoryProps {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  showStartIcon: boolean;
  startIcon: IconName;
  showEndIcon: boolean;
  endIcon: IconName;
  /** Used as aria-label when variant is icon (canvas shows icon only). */
  ariaLabel?: string;
  className?: string;
  testId?: string;
}

function ButtonStoryWrapper({
  label,
  variant,
  size,
  disabled,
  showStartIcon,
  startIcon,
  showEndIcon,
  endIcon,
  ariaLabel,
  className,
  testId,
}: ButtonStoryProps) {
  const StartIconComponent = showStartIcon ? getLucideIcon(startIcon) : null;
  const EndIconComponent = showEndIcon ? getLucideIcon(endIcon) : null;
  const iconPx = SIZE_ICON_PX[size];
  const icon = StartIconComponent ? (
    <StartIconComponent size={iconPx} />
  ) : undefined;
  const endIconNode = EndIconComponent ? (
    <EndIconComponent size={iconPx} />
  ) : undefined;
  const isIconOnly = variant === "icon";
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      icon={icon}
      endIcon={endIconNode}
      className={className}
      testId={testId}
      aria-label={
        isIconOnly ? ariaLabel || label?.trim() || "Action" : undefined
      }
    >
      {isIconOnly ? undefined : label}
    </Button>
  );
}

const meta = {
  id: "components-button",
  title: "Components/Button",
  component: ButtonStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary, secondary, link, icon, or danger button. Optional start/end icon (Lucide React). When variant=icon the canvas shows only the icon (label is used for aria-label). Built from Figma: Orion v2.0 (node 555-8049).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "link",
        "icon",
        "danger",
      ] as ButtonVariant[],
      description: "Visual style",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"] as ButtonSize[],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    showStartIcon: {
      control: "boolean",
      description: "Show icon before label",
    },
    startIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Start icon (Lucide)",
    },
    showEndIcon: { control: "boolean", description: "Show icon after label" },
    endIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "End icon (Lucide)",
    },
    ariaLabel: {
      control: "text",
      description: "aria-label for icon-only buttons (accessibility)",
    },
  },
} satisfies Meta<typeof ButtonStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary button",
    variant: "primary",
    size: "medium",
    disabled: false,
    showStartIcon: false,
    startIcon: "Plus",
    showEndIcon: false,
    endIcon: "ChevronRight",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: "Secondary button",
    variant: "secondary",
  },
};

export const Link: Story = {
  args: {
    ...Primary.args,
    label: "Link button",
    variant: "link",
  },
};

export const Icon: Story = {
  args: {
    ...Primary.args,
    label: "Delete",
    variant: "icon",
    showStartIcon: true,
    startIcon: "Trash2",
  },
};

export const IconOnly: Story = {
  args: {
    ...Primary.args,
    label: "",
    ariaLabel: "Delete",
    variant: "icon",
    showStartIcon: true,
    startIcon: "Trash2",
    showEndIcon: false,
    endIcon: "ChevronRight",
  },
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    label: "Delete",
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    label: "Small",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    label: "Large button",
    size: "large",
  },
};

export const WithStartIcon: Story = {
  args: {
    ...Primary.args,
    label: "Add item",
    showStartIcon: true,
    startIcon: "Plus",
  },
};

export const WithEndIcon: Story = {
  args: {
    ...Primary.args,
    label: "Continue",
    showEndIcon: true,
    endIcon: "ChevronRight",
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    label: "Disabled",
    disabled: true,
  },
};
