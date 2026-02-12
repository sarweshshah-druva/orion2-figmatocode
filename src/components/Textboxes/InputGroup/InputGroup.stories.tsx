import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, useRef, useEffect } from "react";
import { InputGroup } from "./InputGroup";

export interface InputGroupStoryProps {
  leadingDropdownLabel?: string;
  showLeadingDropdown: boolean;
  trailingDropdownLabel?: string;
  showTrailingDropdown: boolean;
  showClear: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorText?: string;
  testId?: string;
}

/** Wrapper so the input group is interactive: typing and clear update state and stay in sync with Controls. */
function InputGroupStoryWrapper({
  leadingDropdownLabel,
  showLeadingDropdown,
  trailingDropdownLabel,
  showTrailingDropdown,
  showClear,
  placeholder,
  value,
  disabled,
  readOnly,
  errorText,
  testId,
}: InputGroupStoryProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);
  return (
    <InputGroup
      leadingDropdownLabel={leadingDropdownLabel}
      showLeadingDropdown={showLeadingDropdown}
      trailingDropdownLabel={trailingDropdownLabel}
      showTrailingDropdown={showTrailingDropdown}
      showClear={showClear}
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onClear={() => setInternalValue("")}
      disabled={disabled}
      readOnly={readOnly}
      errorText={errorText}
      testId={testId}
    />
  );
}

const meta = {
  id: "textboxes-input-group",
  title: "Components/Textboxes/Input Group",
  component: InputGroupStoryWrapper,
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input Group – compound text input with optional leading and trailing dropdown segments sharing a single border. Figma node 94-4794. States: Default, Focused, Disabled, Read-Only, Error.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showLeadingDropdown: {
      control: "boolean",
      description: "Show the leading (left) dropdown segment",
    },
    leadingDropdownLabel: {
      control: "text",
      description: "Label text for the leading dropdown",
      if: { arg: "showLeadingDropdown" },
    },
    showTrailingDropdown: {
      control: "boolean",
      description: "Show the trailing (right) dropdown segment",
    },
    trailingDropdownLabel: {
      control: "text",
      description: "Label text for the trailing dropdown",
      if: { arg: "showTrailingDropdown" },
    },
    showClear: {
      control: "boolean",
      description: "Show clear (X) button when input has a value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state",
    },
    errorText: {
      control: "text",
      description: "Error text – when set, enables error state (red border)",
    },
    testId: {
      control: "text",
      description: "data-testid for testing",
    },
  },
  args: {
    showLeadingDropdown: true,
    leadingDropdownLabel: "Dropdown",
    showTrailingDropdown: true,
    trailingDropdownLabel: "Dropdown",
    showClear: true,
    placeholder: "Label Text",
  },
} satisfies Meta<typeof InputGroupStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma State=Default: placeholder, leading dropdown, trailing dropdown. */
export const Default: Story = {
  args: {},
};

/** Figma State=Default with value: shows clear X button. */
export const Filled: Story = {
  args: {
    value: "Label Text",
  },
  parameters: {
    docs: {
      description: {
        story: "Filled state: input has value, clear X is visible.",
      },
    },
  },
};

/** Figma State=Focused: blue border, clear X visible. */
export const Focused: Story = {
  args: {},
  render: function FocusedStory() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [val, setVal] = useState("Label Text");
    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    return (
      <InputGroup
        ref={inputRef}
        showLeadingDropdown
        leadingDropdownLabel="Dropdown"
        showTrailingDropdown
        trailingDropdownLabel="Dropdown"
        showClear
        placeholder="Label Text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClear={() => setVal("")}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focused state: blue border, clear X visible.",
      },
    },
  },
};

/** Figma State=Disabled: dimmed text, no interaction. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** Figma State=Read-Only: secondary text, not editable. */
export const ReadOnly: Story = {
  args: {
    value: "Label Text",
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Read-only state: value visible but not editable.",
      },
    },
  },
};

/** Figma State=Error: red border, clear X, error text below. */
export const Error: Story = {
  args: {
    value: "Label Text",
    errorText: "Error text will come here",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state: red border, clear X, error text below.",
      },
    },
  },
};

/** Without leading dropdown. */
export const WithoutLeadingDropdown: Story = {
  args: {
    showLeadingDropdown: false,
  },
  parameters: {
    docs: {
      description: {
        story: "showLeadingDropdown=false hides the leading dropdown segment.",
      },
    },
  },
};

/** Without trailing dropdown. */
export const WithoutTrailingDropdown: Story = {
  args: {
    showTrailingDropdown: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "showTrailingDropdown=false hides the trailing dropdown segment.",
      },
    },
  },
};

/** Input only – no dropdowns. */
export const InputOnly: Story = {
  args: {
    showLeadingDropdown: false,
    showTrailingDropdown: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Both dropdowns hidden – input only.",
      },
    },
  },
};

/** All five Figma states side by side. */
export const AllStates: Story = {
  args: {},
  render: function AllStatesStory() {
    const focusedRef = useRef<HTMLInputElement>(null);
    const [focusedVal, setFocusedVal] = useState("Label Text");
    useEffect(() => {
      focusedRef.current?.focus();
    }, []);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "480px",
        }}
      >
        {/* Default */}
        <InputGroup
          placeholder="Label Text"
          showLeadingDropdown
          leadingDropdownLabel="Dropdown"
          showTrailingDropdown
          trailingDropdownLabel="Dropdown"
          showClear
        />
        {/* Focused */}
        <InputGroup
          ref={focusedRef}
          placeholder="Label Text"
          showLeadingDropdown
          leadingDropdownLabel="Dropdown"
          showTrailingDropdown
          trailingDropdownLabel="Dropdown"
          showClear
          value={focusedVal}
          onChange={(e) => setFocusedVal(e.target.value)}
          onClear={() => setFocusedVal("")}
        />
        {/* Disabled */}
        <InputGroup
          placeholder="Label Text"
          showLeadingDropdown
          leadingDropdownLabel="Dropdown"
          showTrailingDropdown
          trailingDropdownLabel="Dropdown"
          showClear
          disabled
        />
        {/* Error */}
        <InputGroup
          placeholder="Label Text"
          showLeadingDropdown
          leadingDropdownLabel="Dropdown"
          showTrailingDropdown
          trailingDropdownLabel="Dropdown"
          showClear
          value="Label Text"
          errorText="Error text will come here"
          onChange={() => {}}
          onClear={() => {}}
        />
        {/* Read-Only */}
        <InputGroup
          placeholder="Label Text"
          showLeadingDropdown
          leadingDropdownLabel="Dropdown"
          showTrailingDropdown
          trailingDropdownLabel="Dropdown"
          showClear
          value="Label Text"
          readOnly
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All five Figma states: Default, Focused, Disabled, Error, Read-Only.",
      },
    },
  },
};
