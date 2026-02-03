import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CircleCheck } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./index";
import type { ToggleGroupVariant } from "./ToggleGroup.types";

export interface ToggleGroupStoryArgs {
  variant: ToggleGroupVariant;
  disabled: boolean;
}

function ToggleGroupDemo({ variant, disabled }: ToggleGroupStoryArgs) {
  if (variant === "single") {
    return (
      <ToggleGroup variant="single" disabled={disabled} defaultValue="center">
        <ToggleGroupItem value="left" label="Left" />
        <ToggleGroupItem value="center" label="Center" />
        <ToggleGroupItem value="right" label="Right" />
      </ToggleGroup>
    );
  }
  return (
    <ToggleGroup variant="multiple" disabled={disabled} defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" label="Bold" />
      <ToggleGroupItem value="italic" label="Italic" />
      <ToggleGroupItem value="underline" label="Underline" />
    </ToggleGroup>
  );
}

const meta = {
  id: "components-toggle-group",
  title: "Components/Toggle Group/Toggle Group",
  component: ToggleGroupDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Figma 20-612.** Horizontal strip of toggle options; rounded outer corners and thin border on the group only. " +
          "Selection mode: **single** (one item at a time) or **multiple** (zero or more). Direct children must be `ToggleGroupItem`. " +
          "Items are contiguous with vertical dividers; no gaps between items.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["single", "multiple"] as ToggleGroupVariant[],
      description:
        "Variant (Figma 20-612): single = one at a time, multiple = zero or more selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable all items in the group",
    },
  },
} satisfies Meta<typeof ToggleGroupDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { variant: "single", disabled: false },
  parameters: {
    docs: {
      description: {
        story: "Figma 20-612: single selection — one item selected at a time.",
      },
    },
  },
};

export const Multiple: Story = {
  args: { variant: "multiple", disabled: false },
  parameters: {
    docs: {
      description: {
        story:
          "Figma 20-612: multiple selection — zero or more items selected.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { variant: "single", disabled: true },
  parameters: {
    docs: {
      description: {
        story: "Figma 20-612: whole group disabled.",
      },
    },
  },
};

export const DaysOfWeek: Story = {
  args: { variant: "multiple", disabled: false },
  render: () => (
    <ToggleGroup
      variant="multiple"
      defaultValue={["mon", "tue", "wed", "fri", "sat", "sun"]}
    >
      <ToggleGroupItem
        value="mon"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="M"
      />
      <ToggleGroupItem
        value="tue"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="T"
      />
      <ToggleGroupItem
        value="wed"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="W"
      />
      <ToggleGroupItem
        value="thu"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="Th"
        disabled
      />
      <ToggleGroupItem
        value="fri"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="F"
      />
      <ToggleGroupItem
        value="sat"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="S"
      />
      <ToggleGroupItem
        value="sun"
        size="medium"
        icon={<CircleCheck size={14} />}
        label="Su"
      />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma 20-612: multi-select with items; one item disabled (Thursday).",
      },
    },
  },
};
