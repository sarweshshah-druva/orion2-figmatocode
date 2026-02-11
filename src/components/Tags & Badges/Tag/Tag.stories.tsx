import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { Tag } from "./Tag";
import type { TagVariant } from "./Tag.types";

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

export interface TagStoryProps {
  showLabel: boolean;
  label?: string;
  showValue: boolean;
  value?: string;
  variant: TagVariant;
  showIcon: boolean;
  leftIcon: IconName;
  dismissable: boolean;
  disabled: boolean;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  testId?: string;
}

function TagStoryWrapper({
  showLabel,
  label,
  showValue,
  value,
  variant,
  showIcon,
  leftIcon,
  dismissable,
  disabled,
  onRemove,
  className,
  testId,
}: TagStoryProps) {
  const IconComponent = showIcon ? getLucideIcon(leftIcon) : null;
  const icon = IconComponent ? <IconComponent size={ICON_PX} /> : undefined;
  return (
    <Tag
      variant={variant}
      label={showLabel ? label : undefined}
      value={showValue ? value : undefined}
      icon={icon}
      dismissable={dismissable}
      onRemove={dismissable ? onRemove : undefined}
      disabled={disabled}
      className={className}
      testId={testId}
    />
  );
}

const meta = {
  id: "components-tags-and-badges-tag",
  title: "Components/Tags & Badges/Tag",
  component: TagStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tag with optional start icon and optional remove (X) button. Variants: neutral, success, warning, danger, info. Built from Figma: Orion v2.0 (node 35-467).",
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
      ] as TagVariant[],
      description: "Visual variant",
    },
    showLabel: {
      control: "boolean",
      description: "Show label (optional)",
    },
    label: {
      control: "text",
      description: "Label text",
      if: { arg: "showLabel" },
    },
    showValue: {
      control: "boolean",
      description: "Show value (optional)",
    },
    value: {
      control: "text",
      description: "Value text",
      if: { arg: "showValue" },
    },
    showIcon: {
      control: "boolean",
      description: "Show icon before label",
    },
    leftIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Left icon (Lucide)",
      if: { arg: "showIcon" },
    },
    dismissable: {
      control: "boolean",
      description: "Show remove (X) button",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof TagStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    showLabel: true,
    label: "Label",
    showValue: true,
    value: "Value",
    variant: "neutral",
    showIcon: true,
    leftIcon: "Settings",
    dismissable: true,
    disabled: false,
  },
};

export const Success: Story = {
  args: {
    ...Neutral.args,
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    ...Neutral.args,
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    ...Neutral.args,
    variant: "danger",
  },
};

export const Info: Story = {
  args: {
    ...Neutral.args,
    variant: "info",
  },
};

export const AllVariants: Story = {
  args: {
    showLabel: false,
    showValue: false,
    variant: "neutral",
    showIcon: false,
    leftIcon: "Settings",
    dismissable: false,
    disabled: false,
  },
  render: () => {
    const SettingsIcon = getLucideIcon("Settings");
    const icon = SettingsIcon ? <SettingsIcon size={ICON_PX} /> : null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Tag
          variant="neutral"
          label="Label"
          value="Value"
          icon={icon}
          dismissable
          onRemove={() => {}}
        />
        <Tag
          variant="success"
          label="Label"
          value="Value"
          icon={icon}
          dismissable
          onRemove={() => {}}
        />
        <Tag
          variant="warning"
          label="Label"
          value="Value"
          icon={icon}
          dismissable
          onRemove={() => {}}
        />
        <Tag
          variant="danger"
          label="Label"
          value="Value"
          icon={icon}
          dismissable
          onRemove={() => {}}
        />
        <Tag
          variant="info"
          label="Label"
          value="Value"
          icon={icon}
          dismissable
          onRemove={() => {}}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All five variants from Figma (35-467): neutral, success, warning, danger, info.",
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    ...Neutral.args,
    showIcon: false,
    label: "Tag without icon",
  },
};

export const WithoutRemove: Story = {
  args: {
    ...Neutral.args,
    dismissable: false,
    label: "Non-removable tag",
  },
};

export const Disabled: Story = {
  args: {
    ...Neutral.args,
    disabled: true,
    label: "Disabled tag",
  },
};

export const WithOnRemove: Story = {
  args: {
    ...Neutral.args,
    dismissable: true,
    onRemove: () => window.alert("Remove clicked"),
    label: "Click X to remove",
  },
};

export const DismissableOnly: Story = {
  args: {
    ...Neutral.args,
    dismissable: true,
    label: "X shown via dismissable (no onRemove)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Remove button appears when dismissable is true even without onRemove.",
      },
    },
  },
};

export const OptionalLabelAndValue: Story = {
  args: {
    ...Neutral.args,
    showLabel: false,
    showValue: false,
    showIcon: true,
    leftIcon: "Tag",
    dismissable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label and value are optional; tag can show only icon and remove when both showLabel and showValue are false.",
      },
    },
  },
};
