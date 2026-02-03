import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import * as LucideIcons from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./index";
import type { ToggleGroupItemSize } from "./ToggleGroup.types";

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

const SIZE_ICON_PX: Record<ToggleGroupItemSize, number> = {
  small: 12,
  medium: 14,
  large: 16,
};

export interface ToggleGroupItemStoryArgs {
  value: string;
  size: ToggleGroupItemSize;
  disabled: boolean;
  label: string;
  showIcon: boolean;
  icon: IconName;
}

function ToggleGroupItemStoryWrapper({
  value,
  size,
  disabled,
  label,
  showIcon,
  icon: iconName,
}: ToggleGroupItemStoryArgs) {
  const IconComponent = showIcon ? getLucideIcon(iconName) : null;
  const iconPx = SIZE_ICON_PX[size];
  const iconNode =
    IconComponent != null ? <IconComponent size={iconPx} /> : undefined;
  return (
    <ToggleGroup variant="single" defaultValue={value}>
      <ToggleGroupItem
        value={value}
        size={size}
        disabled={disabled}
        icon={iconNode}
        label={label}
      />
    </ToggleGroup>
  );
}

const meta = {
  id: "components-toggle-group-item",
  title: "Components/Toggle Group/Toggle Group Item",
  component: ToggleGroupItemStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Figma 2247-21795.** One option inside a `ToggleGroup`. No corner radius on the item (radius only on the group). " +
          "**Sizes:** small | medium | large. **States:** selected (primary bg, inverse text), unselected (white bg, brand text + border), disabled (subtle bg, muted text). " +
          "**Content:** optional icon (left) + label. Icon: use Lucide React; size 12px (small), 14px (medium), 16px (large). Color follows state. Must be a direct child of `ToggleGroup`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Unique value for selection (Figma 2247-21795)",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"] as ToggleGroupItemSize[],
      description: "Size variant (Figma 2247-21795): small | medium | large",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (Figma 2247-21795)",
    },
    label: { control: "text", description: "Label (Figma 2247-21795)" },
    showIcon: {
      control: "boolean",
      description: "Show icon before label (Lucide React)",
    },
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Icon from Lucide React; size is derived from item size",
      if: { arg: "showIcon" },
    },
  },
} satisfies Meta<typeof ToggleGroupItemStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "item",
    size: "medium",
    disabled: false,
    label: "Toggle Group Item",
    showIcon: false,
    icon: "CircleCheck",
  },
  parameters: {
    docs: {
      description: {
        story: "Figma 2247-21795: default (medium size, unselected state).",
      },
    },
  },
};

export const Sizes: Story = {
  args: {
    value: "item",
    size: "medium",
    disabled: false,
    label: "Label",
    showIcon: true,
    icon: "CircleCheck",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      {(["small", "medium", "large"] as ToggleGroupItemSize[]).map((size) => (
        <div key={size}>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-neutral-tertiary)",
              marginBottom: 4,
              textTransform: "capitalize",
            }}
          >
            {size}
          </div>
          <ToggleGroupItemStoryWrapper
            {...args}
            value={`item-${size}`}
            size={size}
            showIcon
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma 2247-21795: size variants small, medium, large. Padding and typography scale with size; icon 12px / 14px / 16px.",
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    value: "item",
    size: "medium",
    disabled: false,
    label: "With icon",
    showIcon: true,
    icon: "CircleCheck",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional icon (Lucide) before the label. Use the **icon** control to pick an icon. Color follows selected / unselected / disabled state.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: "disabled",
    size: "medium",
    disabled: true,
    label: "Disabled",
    showIcon: true,
    icon: "CircleCheck",
  },
  render: (args) => (
    <ToggleGroup variant="single" defaultValue="other">
      <ToggleGroupItem value="other" size="medium" label="Other" />
      <ToggleGroupItem
        value={args.value}
        size={args.size}
        disabled={args.disabled}
        label={args.label}
        icon={
          getLucideIcon(args.icon)
            ? (() => {
                const C = getLucideIcon(args.icon)!;
                return <C size={SIZE_ICON_PX[args.size]} />;
              })()
            : undefined
        }
      />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma 2247-21795: disabled state — not clickable, subtle bg, muted text and icon.",
      },
    },
  },
};
