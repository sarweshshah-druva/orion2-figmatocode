import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, useEffect } from "react";
import { MultiTagTextbox } from "./MultiTagTextbox";
import type { TagItem } from "./MultiTagTextbox.types";

const SAMPLE_TAGS: TagItem[] = [
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
  { label: "type", value: "folder" },
];

/** Wrapper so the multi-tag textbox is interactive: clicking X on a tag removes it and state stays in sync with Controls. */
function MultiTagTextboxStoryWrapper({
  tags: tagsProp,
  showDescription,
  descriptionText,
  showDropdown,
  disabled,
  testId,
}: React.ComponentProps<typeof MultiTagTextbox>) {
  const [tags, setTags] = useState<TagItem[]>(tagsProp ?? []);
  useEffect(() => {
    setTags(tagsProp ?? []);
  }, [tagsProp]);
  return (
    <MultiTagTextbox
      tags={tags}
      onRemove={(index) => setTags((prev) => prev.filter((_, i) => i !== index))}
      showDescription={showDescription}
      descriptionText={descriptionText}
      showDropdown={showDropdown}
      disabled={disabled}
      testId={testId}
    />
  );
}

const meta = {
  id: "textboxes-multi-tag-textbox",
  title: "Components/Textboxes/Multi-tag Textbox",
  component: MultiTagTextboxStoryWrapper,
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-tag Textbox – container showing multiple dismissable tags in a wrapping layout with a trailing dropdown chevron and optional description. Figma node 145-7349.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDescription: {
      control: "boolean",
      description:
        "showDescription (Figma): show description text below the container",
    },
    descriptionText: {
      control: "text",
      description:
        "descriptionText (Figma): helper text below the container",
      if: { arg: "showDescription" },
    },
    showDropdown: {
      control: "boolean",
      description:
        "showDropdown (Figma): show trailing dropdown chevron",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    testId: {
      control: "text",
      description: "data-testid for testing",
    },
  },
  args: {
    tags: SAMPLE_TAGS,
    showDescription: true,
    descriptionText: "Description text will come here",
    showDropdown: true,
    disabled: false,
  },
} satisfies Meta<typeof MultiTagTextboxStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default state with multiple tags, dropdown chevron, and description. */
export const Default: Story = {
  args: {},
};

/** Disabled state: tags are not dismissable, subdued appearance. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state: tags not dismissable, muted appearance.",
      },
    },
  },
};

/** Without description text below. */
export const WithoutDescription: Story = {
  args: {
    showDescription: false,
  },
  parameters: {
    docs: {
      description: {
        story: "showDescription=false hides the helper text.",
      },
    },
  },
};

/** Without the dropdown chevron. */
export const WithoutDropdown: Story = {
  args: {
    showDropdown: false,
  },
  parameters: {
    docs: {
      description: {
        story: "showDropdown=false hides the trailing chevron.",
      },
    },
  },
};

/** Interactive: tags can be removed by clicking X. */
export const Interactive: Story = {
  args: {
    descriptionText: "Click X on any tag to remove it",
  },
  parameters: {
    docs: {
      description: {
        story:
          "All stories are interactive: click the X button on any tag to remove it (except when disabled).",
      },
    },
  },
};

/** Few tags – narrower content. */
export const FewTags: Story = {
  args: {
    tags: [
      { label: "type", value: "folder" },
      { label: "type", value: "folder" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Fewer tags: layout adjusts to smaller content.",
      },
    },
  },
};
