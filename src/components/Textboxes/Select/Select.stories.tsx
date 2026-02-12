import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Select } from "./Select";

const SAMPLE_OPTIONS = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

export interface SelectStoryProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorText?: string;
  descriptionText?: string;
  showDescription: boolean;
  testId?: string;
}

function SelectStoryWrapper({
  value,
  placeholder,
  disabled,
  readOnly,
  errorText,
  descriptionText,
  showDescription,
  testId,
}: SelectStoryProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  return (
    <Select
      value={selectedValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      errorText={errorText}
      descriptionText={descriptionText}
      showDescription={showDescription}
      testId={testId}
      options={SAMPLE_OPTIONS}
      onSelect={(val) => {
        const option = SAMPLE_OPTIONS.find((o) => o.value === val);
        setSelectedValue(option?.label);
      }}
    />
  );
}

const meta = {
  id: "components-textboxes-select",
  title: "Components/Textboxes/Select",
  component: SelectStoryWrapper,
  decorators: [
    (Story) => (
      <div style={{ width: 348, minHeight: 320 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select – special type of Textbox with no left icon and with dropdown functionality. Rest all functionality is same as Textbox. Button-based for full styling control. Shows selected value or placeholder text with trailing chevron icon. Figma node 1994-16022. States: Default, Disabled, Error, Focused, Read-Only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDescription: {
      control: "boolean",
      description: "Show description or error text below",
    },
    descriptionText: {
      control: "text",
      description: "Helper text below the select",
      if: { arg: "showDescription" },
    },
    errorText: {
      control: "text",
      description: "Error text – when set, enables error state (red border)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no value is selected",
    },
    value: {
      control: "text",
      description: "Selected value text displayed in the select",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state",
    },
    testId: {
      control: "text",
      description: "data-testid for testing",
    },
  },
  args: {
    showDescription: true,
    descriptionText: "Description text will come here",
    placeholder: "Label Text",
  },
} satisfies Meta<typeof SelectStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma State=Default: placeholder text, description. */
export const Default: Story = {
  args: {},
};

/** With selected value. */
export const WithValue: Story = {
  args: {
    value: "Selected Option",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with a selected value displayed.",
      },
    },
  },
};

/** Figma State=Focused: blue border. Interactive: open dropdown and select an option. */
export const Focused: Story = {
  args: {},
  render: function FocusedStory() {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    return (
      <div style={{ width: 348 }}>
        <Select
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          value={selectedValue}
          options={SAMPLE_OPTIONS}
          onSelect={(val) => {
            const option = SAMPLE_OPTIONS.find((o) => o.value === val);
            setSelectedValue(option?.label);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focused state: blue border. Open dropdown and select an option.",
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

/** Disabled with value. */
export const DisabledWithValue: Story = {
  args: {
    value: "Selected Option",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state with a selected value.",
      },
    },
  },
};

/** Figma State=Read-Only: secondary text, not editable. */
export const ReadOnly: Story = {
  args: {
    value: "Selected Option",
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

/** Figma State=Error: red border, error text below. */
export const Error: Story = {
  args: {
    errorText: "Error text will come here",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state: red border, error text below.",
      },
    },
  },
};

/** Error with value. */
export const ErrorWithValue: Story = {
  args: {
    value: "Selected Option",
    errorText: "Error text will come here",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state with a selected value.",
      },
    },
  },
};

/** Without description. */
export const WithoutDescription: Story = {
  args: {
    showDescription: false,
  },
  parameters: {
    docs: {
      description: {
        story: "showDescription=false hides helper text.",
      },
    },
  },
};

/** All states side by side. Interactive: each select supports opening dropdown and choosing an option where not disabled/read-only. */
export const AllStates: Story = {
  args: {},
  render: function AllStatesStory() {
    const [defaultVal, setDefaultVal] = useState<string | undefined>();
    const [focusedVal, setFocusedVal] = useState<string | undefined>();
    const [errorVal, setErrorVal] = useState<string | undefined>();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "348px",
        }}
      >
        {/* Default */}
        <Select
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          value={defaultVal}
          options={SAMPLE_OPTIONS}
          onSelect={(val) => {
            const option = SAMPLE_OPTIONS.find((o) => o.value === val);
            setDefaultVal(option?.label);
          }}
        />
        {/* Focused – click to focus and open */}
        <Select
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          value={focusedVal}
          options={SAMPLE_OPTIONS}
          onSelect={(val) => {
            const option = SAMPLE_OPTIONS.find((o) => o.value === val);
            setFocusedVal(option?.label);
          }}
        />
        {/* Disabled */}
        <Select
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          disabled
          options={SAMPLE_OPTIONS}
          onSelect={() => {}}
        />
        {/* Error */}
        <Select
          placeholder="Label Text"
          errorText="Error text will come here"
          showDescription
          value={errorVal}
          options={SAMPLE_OPTIONS}
          onSelect={(val) => {
            const option = SAMPLE_OPTIONS.find((o) => o.value === val);
            setErrorVal(option?.label);
          }}
        />
        {/* With Value */}
        <Select
          value="Selected Option"
          descriptionText="Description text will come here"
          showDescription
          options={SAMPLE_OPTIONS}
          onSelect={() => {}}
        />
        {/* Read-Only */}
        <Select
          value="Selected Option"
          descriptionText="Description text will come here"
          showDescription
          readOnly
          options={SAMPLE_OPTIONS}
          onSelect={() => {}}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All states: Default, Focused, Disabled, Error, With Value, Read-Only. Open dropdown and select where enabled.",
      },
    },
  },
};
