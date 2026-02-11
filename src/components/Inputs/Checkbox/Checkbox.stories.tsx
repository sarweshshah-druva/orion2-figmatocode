import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxState } from "./Checkbox.types";

const STATE_OPTIONS: CheckboxState[] = ["unchecked", "checked", "indeterminate"];

/** Wrapper so the checkbox is interactive: clicks update state and stay in sync with Controls. */
function CheckboxWithStateControl({
  state: stateProp,
  onStateChange,
  ...props
}: React.ComponentProps<typeof Checkbox> & { state: CheckboxState; onStateChange?: (s: CheckboxState) => void }) {
  const [state, setState] = useState<CheckboxState>(stateProp);
  
  useEffect(() => {
    setState(stateProp);
  }, [stateProp]);

  return (
    <Checkbox
      {...props}
      state={state}
      onStateChange={(newState) => {
        setState(newState);
        onStateChange?.(newState);
      }}
    />
  );
}

const meta = {
  id: "components-checkbox",
  title: "Components/Inputs/Checkbox",
  component: CheckboxWithStateControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox with label and optional description. States: unchecked, checked, indeterminate; enabled and disabled. Use the **State** dropdown to switch between the three options. Built from Figma: Orion v2.0 (node 829-551). Supports light and dark themes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Primary text next to the checkbox",
    },
    showDescription: {
      control: "boolean",
      description: "Show description below the label",
    },
    description: {
      control: "text",
      description: "Secondary text below the label (shown when Show description is true)",
      if: { arg: "showDescription" },
    },
    state: {
      control: "select",
      options: STATE_OPTIONS,
      description: "Visual state: unchecked, checked, or indeterminate (3-option dropdown)",
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
} satisfies Meta<typeof CheckboxWithStateControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    showDescription: true,
    description: "Description",
    state: "unchecked",
    disabled: false,
  },
};

export const UncheckedEnabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "unchecked",
    disabled: false,
  },
};

export const UncheckedDisabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "unchecked",
    disabled: true,
  },
};

export const CheckedEnabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "checked",
    disabled: false,
  },
};

export const CheckedDisabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "checked",
    disabled: true,
  },
};

export const IndeterminateEnabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "indeterminate",
    disabled: false,
  },
};

export const IndeterminateDisabled: Story = {
  args: {
    label: "Label",
    description: "Description",
    state: "indeterminate",
    disabled: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Accept terms",
    description: "You must agree to continue",
    state: "unchecked",
  },
};

export const LabelOnly: Story = {
  args: {
    label: "Label only",
    showDescription: false,
    state: "unchecked",
  },
};

/** All six states: top row enabled (unchecked, checked, indeterminate), bottom row disabled. Matches Figma 829-667. */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto",
        gap: "24px 32px",
        maxWidth: "520px",
      }}
    >
      <Checkbox label="Label" description="Description" checked={false} disabled={false} />
      <Checkbox label="Label" description="Description" checked={true} disabled={false} onChange={() => {}} />
      <Checkbox label="Label" description="Description" indeterminate={true} disabled={false} onChange={() => {}} />
      <Checkbox label="Label" description="Description" checked={false} disabled={true} />
      <Checkbox label="Label" description="Description" checked={true} disabled={true} onChange={() => {}} />
      <Checkbox label="Label" description="Description" indeterminate={true} disabled={true} onChange={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Row 1: unchecked, checked, indeterminate (enabled). Row 2: same three (disabled). Matches Figma 829-667.",
      },
    },
  },
};

function CheckboxGroupStory() {
  const [checked, setChecked] = useState<string[]>([]);
  const items = ["Option A", "Option B", "Option C"];
  const allChecked = items.length === checked.length;
  const someChecked = checked.length > 0;

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setChecked(items);
    else setChecked([]);
  };

  const handleChildChange = (item: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setChecked((c) => [...c, item]);
    else setChecked((c) => c.filter((x) => x !== item));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={handleParentChange}
      />
      {items.map((item) => (
        <Checkbox
          key={item}
          label={item}
          checked={checked.includes(item)}
          onChange={handleChildChange(item)}
        />
      ))}
    </div>
  );
}

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupStory />,
  parameters: {
    docs: {
      description: {
        story: "Select-all pattern with indeterminate state when only some children are checked.",
      },
    },
  },
};
