import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import * as LucideIcons from "lucide-react";
import { IconLabel } from "./IconLabel";

/** Known non-icon exports from lucide-react (not React components). */
const NON_ICON_KEYS = new Set(["createLucideIcon", "LucideIcon", "IconNode"]);

/** All Lucide icon names (excluding createLucideIcon and type exports), deduped to base names. */
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

/** Props for the story wrapper – these show up in Docs/Controls. IconLabel itself keeps icon/endIcon (ReactNode). */
export interface IconLabelStoryProps {
  label: string;
  showLeftIcon: boolean;
  leftIcon: IconName;
  showRightIcon: boolean;
  rightIcon: IconName;
  className?: string;
  testId?: string;
}

/** Wrapper used as story component so Docs ArgsTable and Controls show icon toggles and selects. */
function IconLabelStoryWrapper({
  label,
  showLeftIcon,
  leftIcon,
  showRightIcon,
  rightIcon,
  className,
  testId,
}: IconLabelStoryProps) {
  const IconComponent = showLeftIcon ? getLucideIcon(leftIcon) : null;
  const EndIconComponent = showRightIcon ? getLucideIcon(rightIcon) : null;
  const icon = IconComponent ? <IconComponent size={16} /> : undefined;
  const endIcon = EndIconComponent ? <EndIconComponent size={16} /> : undefined;
  return (
    <IconLabel
      label={label}
      icon={icon}
      endIcon={endIcon}
      className={className}
      testId={testId}
    />
  );
}

const meta = {
  title: "Components/IconLabel",
  component: IconLabelStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon and label in a horizontal row. Use for list items, chips, or inline labels. Built from Figma: Orion v2.0 icon-label. Use the **icon** and **end icon** controls below to pick Lucide icons.",
      },
    },
    // Figma: https://www.figma.com/design/Pmu14DBkksDbOHAfcOt2k4/Orion-v2.0?node-id=2830-997
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text" },
    showLeftIcon: {
      control: "boolean",
      description: "Show icon before the label",
    },
    leftIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Lucide icon before the label",
      if: { arg: "showLeftIcon" },
    },
    showRightIcon: {
      control: "boolean",
      description: "Show icon after the label",
    },
    rightIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Lucide icon after the label",
      if: { arg: "showRightIcon" },
    },
    className: { control: "text" },
    testId: { control: "text" },
  },
  args: {
    label: "Label text",
    showLeftIcon: false,
    leftIcon: "Layers",
    showRightIcon: false,
    rightIcon: "ChevronRight",
  },
} satisfies Meta<typeof IconLabelStoryWrapper>;

export default meta;

type Story = StoryObj<typeof IconLabelStoryWrapper>;

export const Default: Story = {
  args: {
    label: "Label text",
    showLeftIcon: false,
    showRightIcon: false,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Label text",
    showLeftIcon: true,
    leftIcon: "Layers",
    showRightIcon: false,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Label text",
    showLeftIcon: false,
    showRightIcon: true,
    rightIcon: "Layers",
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Label text",
    showLeftIcon: true,
    leftIcon: "Layers",
    showRightIcon: true,
    rightIcon: "ChevronRight",
  },
};

export const LabelOnly: Story = {
  args: {
    label: "Label only, no icons",
    showLeftIcon: false,
    showRightIcon: false,
  },
};
