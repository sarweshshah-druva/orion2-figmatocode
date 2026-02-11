import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio } from "./Radio";

const meta = {
  id: "components-radio",
  title: "Components/Inputs/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Single radio option: circle indicator, label, and optional description. Use multiple Radio components with the same name for a group. Built from Figma: Orion v2.0 (node 62-5884).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Primary text next to the radio circle",
    },
    description: {
      control: "text",
      description: "Optional secondary text below the label",
    },
    value: {
      control: "text",
      description: "Value for this option",
    },
    name: {
      control: "text",
      description: "Name of the radio group (same for all options)",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state",
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
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    description: "Description",
    value: "option1",
    name: "group1",
    disabled: false,
  },
};

export const UncheckedEnabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    value: "opt1",
    name: "demo",
    disabled: false,
  },
};

export const UncheckedDisabled: Story = {
  args: {
    ...UncheckedEnabled.args,
    label: "Label",
    description: "Description",
    disabled: true,
  },
};

export const CheckedEnabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    value: "opt1",
    name: "demo",
    checked: true,
    disabled: false,
    onChange: () => {},
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    value: "opt1",
    name: "demo",
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};

export const WithDescription: Story = {
  args: {
    label: "Save to cloud",
    description: "Sync your data across devices",
    value: "cloud",
    name: "storage",
  },
};

export const LabelOnly: Story = {
  args: {
    label: "Label only",
    value: "simple",
    name: "simple",
  },
};

function RadioGroupStory() {
  const [value, setValue] = useState("a");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Radio
        name="letters"
        value="a"
        label="Option A"
        description="First choice"
        checked={value === "a"}
        onChange={(e) => setValue(e.target.value)}
      />
      <Radio
        name="letters"
        value="b"
        label="Option B"
        description="Second choice"
        checked={value === "b"}
        onChange={(e) => setValue(e.target.value)}
      />
      <Radio
        name="letters"
        value="c"
        label="Option C"
        description="Third choice"
        checked={value === "c"}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export const RadioGroup: Story = {
  args: {
    label: "",
    value: "",
  },
  render: () => <RadioGroupStory />,
  parameters: {
    docs: {
      description: {
        story:
          "Multiple radios with the same name form a group. Controlled selection.",
      },
    },
  },
};

/** All four states side by side for visual comparison with Figma (node 62-5884). */
export const AllStates: Story = {
  args: {
    label: "",
    value: "",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        maxWidth: "400px",
      }}
    >
      <Radio
        name="all"
        value="u-e"
        label="Label"
        description="Description"
        checked={false}
        disabled={false}
      />
      <Radio
        name="all"
        value="u-d"
        label="Label"
        description="Description"
        checked={false}
        disabled={true}
      />
      <Radio
        name="all"
        value="c-e"
        label="Label"
        description="Description"
        checked={true}
        disabled={false}
        onChange={() => {}}
      />
      <Radio
        name="all"
        value="c-d"
        label="Label"
        description="Description"
        checked={true}
        disabled={true}
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Unchecked enabled, unchecked disabled, checked enabled, checked disabled (matches Figma 2×2 grid).",
      },
    },
  },
};
