import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { Badge } from "../Tags & Badges/Badge";
import type { DropdownMenuItemProps } from "./DropdownMenu.types";

/* ── Lucide icon helpers (same pattern as other components) ─────── */

const NON_ICON_KEYS = new Set(["createLucideIcon", "LucideIcon", "IconNode"]);

const LUCIDE_ICON_NAMES = (
  Object.keys(LucideIcons) as Array<keyof typeof LucideIcons>
)
  .filter(
    (key): key is keyof typeof LucideIcons =>
      !NON_ICON_KEYS.has(key) &&
      LucideIcons[key] != null &&
      !key.endsWith("Icon"),
  )
  .sort();

const ICON_OPTIONS = LUCIDE_ICON_NAMES as readonly string[];
type IconName = (typeof LUCIDE_ICON_NAMES)[number];

function getLucideIcon(
  name: string,
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

const ICON_PX = 16;

/* ── Story wrapper to resolve icon names & badge values ──────────── */

interface MenuItemStoryProps
  extends Omit<DropdownMenuItemProps, "leftIcon" | "status"> {
  leftIcon?: IconName;
  /** Text rendered inside a Badge when showBadgeStatus is true. */
  badgeValue?: string;
}

function MenuItemStoryWrapper({
  leftIcon,
  showLeftIcon,
  showBadgeStatus,
  badgeValue,
  ...rest
}: MenuItemStoryProps) {
  const IconComponent =
    showLeftIcon && leftIcon ? getLucideIcon(leftIcon) : null;
  const iconNode = IconComponent ? <IconComponent size={ICON_PX} /> : undefined;
  const statusNode = showBadgeStatus ? <Badge label={badgeValue} /> : undefined;
  return (
    <DropdownMenuItem
      {...rest}
      showLeftIcon={showLeftIcon}
      leftIcon={iconNode}
      showBadgeStatus={showBadgeStatus}
      status={statusNode}
    />
  );
}

/* ── Meta ────────────────────────────────────────────────────────── */

const meta = {
  id: "components-dropdown-menu-item",
  title: "Components/Dropdown Menu/Dropdown Menu Item",
  component: MenuItemStoryWrapper,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown Menu Item – individual menu item with 4 states: Default, Hover, Selected, Disabled. Supports leftIcon, subText, nestedList chevron, badge/status. Figma node 13-367.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["Default", "Hover", "Selected", "Disabled"],
      description: "state (Figma): visual state of the item",
    },
    itemText: {
      control: "text",
      description: "itemText (Figma): label text",
    },
    subText: {
      control: "text",
      description: "subText (Figma): secondary text below label",
    },
    showSubText: {
      control: "boolean",
      description: "showSubText (Figma): show secondary text",
    },
    showLeftIcon: {
      control: "boolean",
      description: "showLeftIcon (Figma): show leading icon",
    },
    leftIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "leftIcon (Figma): leading icon (Lucide)",
      if: { arg: "showLeftIcon" },
    },
    nestedList: {
      control: "boolean",
      description: "nestedList (Figma): show nested-list chevron ›",
    },
    showBadgeStatus: {
      control: "boolean",
      description: "showBadgeStatus (Figma): show badge/status element",
    },
    badgeValue: {
      control: "text",
      description: "Badge label text (used when showBadgeStatus is true)",
      if: { arg: "showBadgeStatus" },
    },
  },
  args: {
    state: "Default",
    itemText: "Label",
    subText: "SubText",
    showSubText: false,
    showLeftIcon: false,
    leftIcon: "Folder",
    nestedList: false,
    showBadgeStatus: false,
    badgeValue: "Value",
  },
} satisfies Meta<typeof MenuItemStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Playground: all Figma props available in controls. */
export const Playground: Story = {
  args: {},
};

/** All four Figma states side by side. */
export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropdownMenuItem itemText="Default" state="Default" />
      <DropdownMenuItem itemText="Hover" state="Hover" />
      <DropdownMenuItem itemText="Selected" state="Selected" />
      <DropdownMenuItem itemText="Disabled" state="Disabled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All four states: Default, Hover, Selected, Disabled.",
      },
    },
  },
};

/** Interactive: click an item to toggle its selected state. */
export const Interactive: Story = {
  args: {},
  render: function InteractiveStory() {
    const items = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"];
    const [selected, setSelected] = useState<Set<string>>(new Set(["Cherry"]));

    const toggle = (item: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        return next;
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            itemText={item}
            state={selected.has(item) ? "Selected" : "Default"}
            onClick={() => toggle(item)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Click any item to toggle between Default and Selected.",
      },
    },
  },
};

/** With left icon and sub-text – all four states. */
export const WithIconAndSubText: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropdownMenuItem
        itemText="Label"
        showLeftIcon
        leftIcon={<LucideIcons.Settings size={ICON_PX} />}
        showSubText
        subText="SubText"
        state="Default"
      />
      <DropdownMenuItem
        itemText="Label"
        showLeftIcon
        leftIcon={<LucideIcons.Settings size={ICON_PX} />}
        showSubText
        subText="SubText"
        state="Hover"
      />
      <DropdownMenuItem
        itemText="Label"
        showLeftIcon
        leftIcon={<LucideIcons.Settings size={ICON_PX} />}
        showSubText
        subText="SubText"
        state="Selected"
      />
      <DropdownMenuItem
        itemText="Label"
        showLeftIcon
        leftIcon={<LucideIcons.Settings size={ICON_PX} />}
        showSubText
        subText="SubText"
        state="Disabled"
      />
    </div>
  ),
};

/** With nested-list chevron. */
export const WithNestedList: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropdownMenuItem itemText="View" nestedList />
      <DropdownMenuItem itemText="Sort By" nestedList />
      <DropdownMenuItem itemText="Export" nestedList state="Disabled" />
    </div>
  ),
};

/** With nested submenu flyout – hover to reveal. */
export const WithNestedSubmenu: Story = {
  args: {},
  render: function NestedSubmenuStory() {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = (item: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        return next;
      });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 260,
          position: "relative",
        }}
      >
        <DropdownMenuItem itemText="Normal item" />
        <DropdownMenuItem
          itemText="Sort By"
          nestedList
          nestedContent={
            <div
              className="orion-dropdown-menu"
              role="menu"
              style={{ width: 180 }}
            >
              {["Name", "Date", "Size", "Type"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  itemText={item}
                  state={selected.has(item) ? "Selected" : "Default"}
                  onClick={() => toggle(item)}
                />
              ))}
            </div>
          }
        />
        <DropdownMenuItem
          itemText="View"
          nestedList
          nestedContent={
            <div
              className="orion-dropdown-menu"
              role="menu"
              style={{ width: 180 }}
            >
              <DropdownMenuItem itemText="Grid" />
              <DropdownMenuItem itemText="List" />
              <DropdownMenuItem itemText="Compact" />
            </div>
          }
        />
        <DropdownMenuItem
          itemText="Disabled nested"
          nestedList
          state="Disabled"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hover over items with chevrons to reveal their nested submenus. Disabled items do not show submenus.",
      },
    },
  },
};

/** With badge status. */
export const WithBadgeStatus: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DropdownMenuItem
        itemText="Warnings"
        showBadgeStatus
        status={
          <Badge
            icon={<LucideIcons.AlertTriangle size={12} />}
            variant="warning"
          />
        }
      />
      <DropdownMenuItem
        itemText="Count"
        showBadgeStatus
        status={<Badge label="42" />}
      />
      <DropdownMenuItem
        itemText="Selected with badge"
        state="Selected"
        showBadgeStatus
        status={<Badge label="3" />}
      />
    </div>
  ),
};
