import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, useMemo, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { DropdownCategory } from "./DropdownCategory";
import { DropdownDivider } from "./DropdownDivider";
import { Badge } from "../Tags & Badges/Badge";

const meta = {
  id: "components-dropdown-menu-menu",
  title: "Components/Dropdown Menu/Dropdown Menu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown Menu – container for menu items with optional search and footer. Props match Figma: showDropdownSearch, showDropdownFooter. Figma node 180-7911.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDropdownSearch: {
      control: "boolean",
      description: "showDropdownSearch (Figma): show the search bar",
    },
    showDropdownFooter: {
      control: "boolean",
      description: "showDropdownFooter (Figma): show the footer area",
    },
  },
  args: {
    showDropdownSearch: false,
    showDropdownFooter: false,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ── Reusable footer component for stories ──────────────────────── */

function DropdownFooter({
  selectedCount,
  totalCount,
  onSelectAll,
}: {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onSelectAll}
        style={{
          border: "none",
          background: "none",
          color: "var(--text-link-default)",
          fontFamily: "var(--font-captions-x-small-family)",
          fontSize: "var(--font-captions-x-small-size)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Select All
      </button>
      <span>
        {totalCount} found&nbsp;&nbsp;{selectedCount} selected
      </span>
    </>
  );
}

/* ── Stories ─────────────────────────────────────────────────────── */

/** Flat list – interactive. Click items to select/deselect. Toggle search & footer via controls. */
export const Flat: Story = {
  args: {
    children: null as unknown as React.ReactNode,
    showDropdownSearch: false,
    showDropdownFooter: false,
  },
  render: function FlatStory(args) {
    const items = ["Label", "Label", "Label", "Label", "Label", "Label"];
    const [selected, setSelected] = useState<Set<number>>(new Set([2]));
    const [nestedSelected, setNestedSelected] = useState<Set<string>>(new Set());
    const [search, setSearch] = useState("");

    const toggle = (i: number) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });

    const toggleNested = (key: string) =>
      setNestedSelected((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });

    const selectAll = () =>
      setSelected(new Set(items.map((_, i) => i)));

    return (
      <DropdownMenu
        showDropdownSearch={args.showDropdownSearch}
        showDropdownFooter={args.showDropdownFooter}
        searchValue={search}
        onSearchChange={setSearch}
        footer={
          <DropdownFooter
            totalCount={items.length}
            selectedCount={selected.size}
            onSelectAll={selectAll}
          />
        }
      >
        {items.map((text, i) => (
          <DropdownMenuItem
            key={i}
            itemText={text}
            state={selected.has(i) ? "Selected" : "Default"}
            nestedList={i === 0}
            nestedContent={
              i === 0 ? (
                <DropdownMenu>
                  {["Sub-item 1", "Sub-item 2", "Sub-item 3"].map((sub) => (
                    <DropdownMenuItem
                      key={sub}
                      itemText={sub}
                      state={nestedSelected.has(sub) ? "Selected" : "Default"}
                      onClick={() => toggleNested(sub)}
                    />
                  ))}
                </DropdownMenu>
              ) : undefined
            }
            onClick={() => toggle(i)}
          />
        ))}
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Flat list (Figma List Type=Flat). Click items to toggle selection. Toggle search & footer via controls.",
      },
    },
  },
};

/** Grouped list – interactive. Click items to select/deselect. Toggle search & footer via controls. */
export const Grouped: Story = {
  args: {
    children: null as unknown as React.ReactNode,
    showDropdownSearch: false,
    showDropdownFooter: false,
  },
  render: function GroupedStory(args) {
    const allKeys = [
      ...["a-0", "a-1", "a-2", "a-3"],
      ...["b-0", "b-1", "b-2"],
    ];
    const [selected, setSelected] = useState<Set<string>>(
      new Set(["a-0"])
    );
    const [search, setSearch] = useState("");

    const toggle = (key: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });

    const selectAll = () => setSelected(new Set(allKeys));

    return (
      <DropdownMenu
        showDropdownSearch={args.showDropdownSearch}
        showDropdownFooter={args.showDropdownFooter}
        searchValue={search}
        onSearchChange={setSearch}
        footer={
          <DropdownFooter
            totalCount={allKeys.length}
            selectedCount={selected.size}
            onSelectAll={selectAll}
          />
        }
      >
        <DropdownCategory categoryText="Category A" />
        {["Label", "Label", "Label", "Label"].map((text, i) => (
          <DropdownMenuItem
            key={`a-${i}`}
            itemText={text}
            state={selected.has(`a-${i}`) ? "Selected" : "Default"}
            onClick={() => toggle(`a-${i}`)}
          />
        ))}
        <DropdownMenuItem itemText="Label" state="Disabled" />
        <DropdownDivider />
        <DropdownCategory categoryText="Category B" />
        {["Label", "Label", "Label"].map((text, i) => (
          <DropdownMenuItem
            key={`b-${i}`}
            itemText={text}
            state={selected.has(`b-${i}`) ? "Selected" : "Default"}
            onClick={() => toggle(`b-${i}`)}
          />
        ))}
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Grouped list (Figma List Type=Grouped) with categories and divider. Toggle search & footer via controls.",
      },
    },
  },
};

/** Full example – search, grouped categories, badges, footer, nested menus. Matches Figma 848-114749. */
export const FullExample: Story = {
  args: {
    children: null as unknown as React.ReactNode,
    showDropdownSearch: true,
    showDropdownFooter: true,
  },
  render: function FullExampleStory(args) {
    const allItems = [
      { key: "a-0", text: "Label", group: "A" },
      { key: "a-1", text: "Label", group: "A" },
      { key: "a-2", text: "Label", group: "A", badge: <Badge icon={<AlertTriangle size={12} />} variant="warning" /> },
      { key: "a-3", text: "Label", group: "A", badge: <Badge label="Value" /> },
      { key: "a-4", text: "Label", group: "A", disabled: true, nestedList: true },
      { key: "b-0", text: "Label", group: "B", subText: "SubText" },
      { key: "b-1", text: "Label", group: "B", nestedList: true },
      { key: "b-2", text: "Label", group: "B" },
    ];

    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Set<string>>(new Set(["a-0"]));
    const [nestedSelected, setNestedSelected] = useState<Set<string>>(new Set());

    const filtered = useMemo(
      () =>
        search
          ? allItems.filter((item) =>
              item.text.toLowerCase().includes(search.toLowerCase())
            )
          : allItems,
      [search]
    );

    const toggle = (key: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });

    const toggleNested = useCallback((key: string) => {
      setNestedSelected((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    }, []);

    const selectAll = () => {
      setSelected(new Set(filtered.filter((i) => !i.disabled).map((i) => i.key)));
    };

    const groups = [...new Set(filtered.map((i) => i.group))];

    /** Build nested submenu for items with nestedList */
    const buildNestedContent = (itemKey: string) => {
      const subItems =
        itemKey === "b-1"
          ? ["Option 1", "Option 2", "Option 3"]
          : ["Sub-item A", "Sub-item B"];
      return (
        <DropdownMenu>
          {subItems.map((sub) => {
            const nKey = `${itemKey}__${sub}`;
            return (
              <DropdownMenuItem
                key={nKey}
                itemText={sub}
                state={nestedSelected.has(nKey) ? "Selected" : "Default"}
                onClick={() => toggleNested(nKey)}
              />
            );
          })}
        </DropdownMenu>
      );
    };

    return (
      <DropdownMenu
        showDropdownSearch={args.showDropdownSearch}
        searchValue={search}
        onSearchChange={setSearch}
        showDropdownFooter={args.showDropdownFooter}
        footer={
          <DropdownFooter
            totalCount={filtered.length}
            selectedCount={selected.size}
            onSelectAll={selectAll}
          />
        }
      >
        {groups.map((group, gi) => {
          const groupItems = filtered.filter((i) => i.group === group);
          return (
            <React.Fragment key={group}>
              {gi > 0 && <DropdownDivider />}
              <DropdownCategory categoryText={`Category ${group}`} />
              {groupItems.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  itemText={item.text}
                  state={
                    item.disabled
                      ? "Disabled"
                      : selected.has(item.key)
                      ? "Selected"
                      : "Default"
                  }
                  onClick={() => toggle(item.key)}
                  nestedList={item.nestedList}
                  nestedContent={
                    item.nestedList ? buildNestedContent(item.key) : undefined
                  }
                  showSubText={!!item.subText}
                  subText={item.subText}
                  showBadgeStatus={!!item.badge}
                  status={item.badge}
                />
              ))}
            </React.Fragment>
          );
        })}
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full interactive example matching Figma 848-114749: search filters items, click to select, Select All in footer, grouped categories with badges and sub-text.",
      },
    },
  },
};

/** With search only – interactive filtering. Toggle search & footer via controls. */
export const WithSearch: Story = {
  args: {
    children: null as unknown as React.ReactNode,
    showDropdownSearch: true,
    showDropdownFooter: false,
  },
  render: function WithSearchStory(args) {
    const allItems = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"];
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const filtered = search
      ? allItems.filter((i) => i.toLowerCase().includes(search.toLowerCase()))
      : allItems;

    const toggle = (item: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        return next;
      });

    const selectAll = () =>
      setSelected(new Set(filtered));

    return (
      <DropdownMenu
        showDropdownSearch={args.showDropdownSearch}
        showDropdownFooter={args.showDropdownFooter}
        searchValue={search}
        onSearchChange={setSearch}
        footer={
          <DropdownFooter
            totalCount={filtered.length}
            selectedCount={selected.size}
            onSelectAll={selectAll}
          />
        }
      >
        {filtered.map((item) => (
          <DropdownMenuItem
            key={item}
            itemText={item}
            state={selected.has(item) ? "Selected" : "Default"}
            onClick={() => toggle(item)}
          />
        ))}
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Search filters items in real time. Click to toggle selection. Toggle search & footer via controls.",
      },
    },
  },
};
