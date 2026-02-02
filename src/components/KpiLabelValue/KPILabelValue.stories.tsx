import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { KPILabelValue } from "./KPILabelValue";
import type { KPILabelValueSize } from "./KPILabelValue.types";

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

const SIZE_ICON_PX: Record<KPILabelValueSize, number> = {
  primary: 24,
  secondary: 20,
  tertiary: 16,
};

export interface KPILabelValueStoryProps {
  label: string;
  value: string;
  unit: string;
  size: KPILabelValueSize;
  showIcon: boolean;
  icon: IconName;
  className?: string;
  testId?: string;
}

function KPILabelValueStoryWrapper({
  label,
  value,
  unit,
  size,
  showIcon,
  icon,
  className,
  testId,
}: KPILabelValueStoryProps) {
  const IconComponent = showIcon ? getLucideIcon(icon) : null;
  const iconPx = SIZE_ICON_PX[size];
  const iconNode = IconComponent ? <IconComponent size={iconPx} /> : undefined;
  return (
    <KPILabelValue
      label={label}
      value={value}
      unit={unit}
      size={size}
      icon={iconNode}
      className={className}
      testId={testId}
    />
  );
}

const meta = {
  id: "components-kpilabelvalue",
  title: "Components/KPI Label Value",
  component: KPILabelValueStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "KPI metric: value (and optional unit) on top, label below. Three sizes: Primary, Secondary, Tertiary. Icon uses tertiary hierarchy. Built from Figma: Orion v2.0 kpi-label-value (node 59-2551).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description:
        "Size variant: Primary (largest), Secondary, Tertiary (smallest)",
    },
    label: { control: "text", description: "Label text below the value" },
    value: { control: "text", description: "Main KPI value (e.g. number)" },
    unit: {
      control: "text",
      description: "Unit shown after value in smaller text (omit to hide)",
    },
    showIcon: {
      control: "boolean",
      description: "Show icon before the value",
    },
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Lucide icon before the value (tertiary hierarchy)",
      if: { arg: "showIcon" },
    },
    className: { control: "text" },
    testId: { control: "text" },
  },
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "primary",
    showIcon: false,
    icon: "Layers",
  },
} satisfies Meta<typeof KPILabelValueStoryWrapper>;

export default meta;

type Story = StoryObj<typeof KPILabelValueStoryWrapper>;

export const Default: Story = {
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "primary",
    showIcon: false,
  },
};

export const Primary: Story = {
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "primary",
    showIcon: false,
  },
};

export const Secondary: Story = {
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "secondary",
    showIcon: false,
  },
};

export const Tertiary: Story = {
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "tertiary",
    showIcon: false,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Label name will come here",
    value: "0.00",
    unit: "Unit",
    size: "primary",
    showIcon: true,
    icon: "Layers",
  },
};

export const ValueOnlyNoUnit: Story = {
  args: {
    label: "Total count",
    value: "1,234",
    unit: "",
    size: "primary",
    showIcon: false,
  },
};

export const WithUnit: Story = {
  args: {
    label: "Revenue",
    value: "42.5",
    unit: "%",
    size: "primary",
    showIcon: false,
  },
};

export const WithIconAndUnit: Story = {
  args: {
    label: "Active users",
    value: "12.5k",
    unit: "users",
    size: "primary",
    showIcon: true,
    icon: "Users",
  },
};
