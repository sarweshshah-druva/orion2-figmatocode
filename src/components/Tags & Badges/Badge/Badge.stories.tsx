import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge.types";

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

const ICON_PX = 14;

export interface BadgeStoryProps {
  label?: string;
  variant: BadgeVariant;
  showIcon: boolean;
  icon: IconName;
  showEndIcon: boolean;
  endIcon: IconName;
  disabled: boolean;
  className?: string;
  testId?: string;
}

function BadgeStoryWrapper({
  label,
  variant,
  showIcon,
  icon,
  showEndIcon,
  endIcon,
  disabled,
  className,
  testId,
}: BadgeStoryProps) {
  const IconComponent = showIcon ? getLucideIcon(icon) : null;
  const EndIconComponent = showEndIcon ? getLucideIcon(endIcon) : null;
  const iconNode = IconComponent ? <IconComponent size={ICON_PX} /> : undefined;
  const endIconNode = EndIconComponent ? (
    <EndIconComponent size={ICON_PX} />
  ) : undefined;
  return (
    <Badge
      label={label}
      variant={variant}
      icon={iconNode}
      endIcon={endIconNode}
      disabled={disabled}
      className={className}
      testId={testId}
    />
  );
}

const meta = {
  id: "components-tags-and-badges-badge",
  title: "Components/Tags & Badges/Badge",
  component: BadgeStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge – pill with optional start icon, label, and optional end icon. Variants: neutral, success, warning, danger, info. Built from Figma: Orion v2.0 (node 35-1735).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "neutral",
        "success",
        "warning",
        "danger",
        "info",
      ] as BadgeVariant[],
      description: "Visual variant",
    },
    label: {
      control: "text",
      description: "Label text or number",
    },
    showIcon: {
      control: "boolean",
      description: "Show icon before label",
    },
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Start icon (Lucide)",
      if: { arg: "showIcon" },
    },
    showEndIcon: {
      control: "boolean",
      description: "Show icon after label",
    },
    endIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "End icon (Lucide)",
      if: { arg: "showEndIcon" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof BadgeStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default from Figma 35-1735: start icon (Settings), label "Value", end icon (Info). */
export const Default: Story = {
  args: {
    label: "Value",
    variant: "neutral",
    showIcon: true,
    icon: "Settings",
    showEndIcon: true,
    endIcon: "Info",
    disabled: false,
  },
};

export const Neutral: Story = {
  args: {
    ...Default.args,
    label: "Badge",
    variant: "neutral",
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    variant: "success",
    label: "Success",
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    variant: "warning",
    label: "Warning",
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    variant: "danger",
    label: "Danger",
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    variant: "info",
    label: "Info",
  },
};

export const Count: Story = {
  args: {
    label: "3",
    variant: "neutral",
    showIcon: false,
    showEndIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Badge used as a count (e.g. notification count).",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => {
    const SettingsIcon = getLucideIcon("Settings");
    const InfoIcon = getLucideIcon("Info");
    const startIcon = SettingsIcon ? <SettingsIcon size={ICON_PX} /> : null;
    const endIcon = InfoIcon ? <InfoIcon size={ICON_PX} /> : null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Badge
          variant="neutral"
          label="Value"
          icon={startIcon}
          endIcon={endIcon}
        />
        <Badge
          variant="success"
          label="Value"
          icon={startIcon}
          endIcon={endIcon}
        />
        <Badge
          variant="warning"
          label="Value"
          icon={startIcon}
          endIcon={endIcon}
        />
        <Badge
          variant="danger"
          label="Value"
          icon={startIcon}
          endIcon={endIcon}
        />
        <Badge
          variant="info"
          label="Value"
          icon={startIcon}
          endIcon={endIcon}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All five variants from Figma (35-1735): neutral, success, warning, danger, info. With start icon (Settings) and end icon (Info).",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    label: "Disabled badge",
  },
};

export const WithChildren: Story = {
  render: () => <Badge variant="neutral">Children content</Badge>,
  parameters: {
    docs: {
      description: {
        story: "Label can be passed via children.",
      },
    },
  },
};

export const StartIconOnly: Story = {
  args: {
    ...Default.args,
    showIcon: true,
    icon: "Settings",
    showEndIcon: false,
    label: "Start icon only",
  },
};

export const EndIconOnly: Story = {
  args: {
    ...Default.args,
    showIcon: false,
    showEndIcon: true,
    endIcon: "Info",
    label: "End icon only",
  },
};

export const NoIcons: Story = {
  args: {
    ...Default.args,
    showIcon: false,
    showEndIcon: false,
    label: "Text only",
  },
};
