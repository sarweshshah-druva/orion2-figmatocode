import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Textbox } from "./Textbox";

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

const ICON_PX = 16;

export interface TextboxStoryProps {
  descriptionText?: string;
  errorText?: string;
  showDescription: boolean;
  showLeftIcon: boolean;
  leftIcon: IconName;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  testId?: string;
}

/** Wrapper so the textbox is interactive: typing and clear update state and stay in sync with Controls. */
function TextboxStoryWrapper({
  descriptionText,
  errorText,
  showDescription,
  showLeftIcon,
  leftIcon,
  placeholder,
  value,
  disabled,
  readOnly,
  testId,
}: TextboxStoryProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);
  const IconComponent = showLeftIcon ? getLucideIcon(leftIcon) : null;
  const iconNode = IconComponent ? <IconComponent size={ICON_PX} /> : undefined;
  return (
    <Textbox
      descriptionText={descriptionText}
      errorText={errorText}
      showDescription={showDescription}
      showLeftIcon={showLeftIcon}
      leftIcon={iconNode}
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onClear={() => setInternalValue("")}
      disabled={disabled}
      readOnly={readOnly}
      testId={testId}
    />
  );
}

const meta = {
  id: "textboxes-textbox",
  title: "Components/Textboxes/Textbox",
  component: TextboxStoryWrapper,
  decorators: [
    (Story) => (
      <div style={{ width: 348 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Textbox – single-line input. No dropdown icon. Trailing slot: clear X only when has value. Figma 851-25000, 851-24737. Use Lucide React for leftIcon.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDescription: {
      control: "boolean",
      description: "showDescription (Figma): show description or error text below",
    },
    descriptionText: {
      control: "text",
      description: "descriptionText (Figma): helper text below the input",
      if: { arg: "showDescription" },
    },
    errorText: {
      control: "text",
      description: "errorText (Figma): error message, enables error state",
    },
    showLeftIcon: {
      control: "boolean",
      description: "showLeftIcon (Figma): show the leading icon",
    },
    leftIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "leftIcon (Figma): leading icon (Lucide)",
      if: { arg: "showLeftIcon" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text (labelText in Figma Default state)",
    },
    value: {
      control: "text",
      description: "Input value (labelText in Figma Filled state)",
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
    showLeftIcon: true,
    leftIcon: "Search",
    placeholder: "Label Text",
  },
} satisfies Meta<typeof TextboxStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Figma State=Default: placeholder, left icon, dropdown chevron, description. */
export const Default: Story = {
  args: {},
};

/** Figma State=Filled: value text, left icon, clear X, description. */
export const Filled: Story = {
  args: {
    value: "Label Text",
  },
  parameters: {
    docs: {
      description: {
        story: "Filled state: input has value, clear X replaces dropdown.",
      },
    },
  },
};

/** Figma State=Focused: value text, left icon, clear X, blue border. */
export const Focused: Story = {
  args: {
    showLeftIcon: true,
    leftIcon: "Search",
  },
  render: function FocusedStory() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [val, setVal] = useState("Label Text");
    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    return (
      <Textbox
        ref={inputRef}
        descriptionText="Description text will come here"
        showDescription
        showLeftIcon
        leftIcon={<LucideIcons.Search size={ICON_PX} />}
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

/** Figma State=Disabled: dimmed text, left icon, description. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** Figma State=Read-Only: secondary text, left icon, description. */
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

/** Figma State=Error: value text, left icon, clear X, red border, error text. */
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

/** showDescription=false: no helper/error text below. */
export const WithoutDescription: Story = {
  args: {
    showDescription: false,
  },
  parameters: {
    docs: {
      description: { story: "showDescription=false hides helper text." },
    },
  },
};

/** All six Figma states side by side. */
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
          width: "348px",
        }}
      >
        {/* Default */}
        <Textbox
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
        />
        {/* Filled */}
        <Textbox
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
          value="Label Text"
          onChange={() => {}}
          onClear={() => {}}
        />
        {/* Focused */}
        <Textbox
          ref={focusedRef}
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
          value={focusedVal}
          onChange={(e) => setFocusedVal(e.target.value)}
          onClear={() => setFocusedVal("")}
        />
        {/* Disabled */}
        <Textbox
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
          disabled
        />
        {/* Read-Only */}
        <Textbox
          placeholder="Label Text"
          descriptionText="Description text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
          value="Label Text"
          readOnly
        />
        {/* Error */}
        <Textbox
          placeholder="Label Text"
          errorText="Error text will come here"
          showDescription
          showLeftIcon
          leftIcon={<LucideIcons.Search size={ICON_PX} />}
          value="Label Text"
          onChange={() => {}}
          onClear={() => {}}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "All six Figma states: Default, Filled, Focused, Disabled, Read-Only, Error.",
      },
    },
  },
};
