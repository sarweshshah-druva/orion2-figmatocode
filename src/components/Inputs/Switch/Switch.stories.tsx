import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import type { SwitchProps } from "./Switch.types";

/** Wrapper so the switch is interactive: clicks update state and stay in sync with Controls. */
function InteractiveSwitch(args: SwitchProps) {
  const [checked, setChecked] = useState(args.checked ?? false);
  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);
  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

const meta = {
  id: "components-switch",
  title: "Components/Inputs/Switch",
  component: InteractiveSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle switch with left/right label–description pairs. In each pair the description is optional. If a label is not provided, that side's text container (and its description) is hidden. At least one of leftLabel or rightLabel must be provided. Built from Figma: Orion v2.0 (node 829-948).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    leftLabel: {
      control: "text",
      description:
        "Label to the left of the switch. If not set, the left text container (and left description) is hidden.",
    },
    leftDescription: {
      control: "text",
      description: "Optional. Only shown when left label is set.",
      if: { arg: "leftLabel" },
    },
    rightLabel: {
      control: "text",
      description:
        "Label to the right of the switch. If not set, the right text container (and right description) is hidden.",
    },
    rightDescription: {
      control: "text",
      description: "Optional. Only shown when right label is set.",
      if: { arg: "rightLabel" },
    },
    checked: {
      control: "boolean",
      description: "On/off state",
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
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftLabel: "Left Label",
    leftDescription: "Left description",
    rightLabel: "Right Label",
    rightDescription: "Right description",
    checked: false,
    disabled: false,
  },
};

export const OffEnabled: Story = {
  args: {
    leftLabel: "Left Label",
    leftDescription: "Left description",
    rightLabel: "Right Label",
    rightDescription: "Right description",
    checked: false,
    disabled: false,
  },
};

export const OnEnabled: Story = {
  args: {
    leftLabel: "Left Label",
    leftDescription: "Left description",
    rightLabel: "Right Label",
    rightDescription: "Right description",
    checked: true,
    disabled: false,
    onChange: () => {},
  },
};

export const OffDisabled: Story = {
  args: {
    leftLabel: "Left Label",
    leftDescription: "Left description",
    rightLabel: "Right Label",
    rightDescription: "Right description",
    checked: false,
    disabled: true,
  },
};

export const OnDisabled: Story = {
  args: {
    leftLabel: "Left Label",
    leftDescription: "Left description",
    rightLabel: "Right Label",
    rightDescription: "Right description",
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};

export const LabelsOnly: Story = {
  args: {
    leftLabel: "Off",
    rightLabel: "On",
    checked: false,
  },
};

export const LeftLabelOnly: Story = {
  args: {
    leftLabel: "Enable feature",
    rightLabel: undefined,
    checked: false,
  },
};

export const RightLabelOnly: Story = {
  args: {
    leftLabel: undefined,
    rightLabel: "On",
    checked: false,
  },
};

export const WithDescriptions: Story = {
  args: {
    leftLabel: "Off",
    leftDescription: "Turn the feature off",
    rightLabel: "On",
    rightDescription: "Turn the feature on",
    checked: false,
  },
};

/** All four states (Figma 829-948): off/on × enabled/disabled. Top row is interactive. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px 32px",
        minWidth: "260px",
        maxWidth: "600px",
      }}
    >
      <InteractiveSwitch
        leftLabel="Left Label"
        leftDescription="Left description"
        rightLabel="Right Label"
        rightDescription="Right description"
        checked={false}
        disabled={false}
      />
      <InteractiveSwitch
        leftLabel="Left Label"
        leftDescription="Left description"
        rightLabel="Right Label"
        rightDescription="Right description"
        checked={true}
        disabled={false}
      />
      <InteractiveSwitch
        leftLabel="Left Label"
        leftDescription="Left description"
        rightLabel="Right Label"
        rightDescription="Right description"
        checked={false}
        disabled={true}
      />
      <InteractiveSwitch
        leftLabel="Left Label"
        leftDescription="Left description"
        rightLabel="Right Label"
        rightDescription="Right description"
        checked={true}
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Top row: off, on (enabled). Bottom row: off, on (disabled). Matches Figma 829-948.",
      },
    },
  },
};
