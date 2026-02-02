import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { SimpleLabelValue } from "./SimpleLabelValue";

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

export interface SimpleLabelValueStoryProps {
  label: string;
  value: string;
  showValueIcon: boolean;
  valueIcon: IconName;
  showValueEndIcon: boolean;
  valueEndIcon: IconName;
  className?: string;
  testId?: string;
}

function SimpleLabelValueStoryWrapper({
  label,
  value,
  showValueIcon,
  valueIcon,
  showValueEndIcon,
  valueEndIcon,
  className,
  testId,
}: SimpleLabelValueStoryProps) {
  const ValueIconComponent = showValueIcon ? getLucideIcon(valueIcon) : null;
  const ValueEndIconComponent = showValueEndIcon
    ? getLucideIcon(valueEndIcon)
    : null;
  const valueIconNode = ValueIconComponent ? (
    <ValueIconComponent size={16} />
  ) : undefined;
  const valueEndIconNode = ValueEndIconComponent ? (
    <ValueEndIconComponent size={16} />
  ) : undefined;
  return (
    <SimpleLabelValue
      label={label}
      value={value}
      valueIcon={valueIconNode}
      valueEndIcon={valueEndIconNode}
      className={className}
      testId={testId}
    />
  );
}

const meta = {
  id: "components-simplelabelvalue",
  title: "Components/Simple Label Value",
  component: SimpleLabelValueStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Label on top, value below. Use for key-value pairs (e.g. Name, Status). Optional icons can flank the value. Built from Figma: Orion v2.0 simple-label-value (node 59-2641).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text above the value" },
    value: { control: "text", description: "Value text below the label" },
    showValueIcon: {
      control: "boolean",
      description: "Show icon before the value",
    },
    valueIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Lucide icon before the value",
      if: { arg: "showValueIcon" },
    },
    showValueEndIcon: {
      control: "boolean",
      description: "Show icon after the value",
    },
    valueEndIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Lucide icon after the value",
      if: { arg: "showValueEndIcon" },
    },
    className: { control: "text" },
    testId: { control: "text" },
  },
  args: {
    label: "Label name",
    value: "Summary text will come here",
    showValueIcon: false,
    valueIcon: "Layers",
    showValueEndIcon: false,
    valueEndIcon: "Layers",
  },
} satisfies Meta<typeof SimpleLabelValueStoryWrapper>;

export default meta;

type Story = StoryObj<typeof SimpleLabelValueStoryWrapper>;

export const Default: Story = {
  args: {
    label: "Label name",
    value: "Summary text will come here",
    showValueIcon: false,
    showValueEndIcon: false,
  },
};

export const WithValueIcons: Story = {
  args: {
    label: "Label name",
    value: "Summary text will come here",
    showValueIcon: true,
    valueIcon: "Layers",
    showValueEndIcon: true,
    valueEndIcon: "Layers",
  },
};

export const LabelOnlyValue: Story = {
  args: {
    label: "Status",
    value: "Active",
    showValueIcon: false,
    showValueEndIcon: false,
  },
};

export const WithSingleValueIcon: Story = {
  args: {
    label: "Data source",
    value: "Primary dataset",
    showValueIcon: true,
    valueIcon: "Database",
    showValueEndIcon: false,
  },
};
