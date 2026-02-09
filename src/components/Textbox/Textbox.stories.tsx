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
  showDescription: boolean;
  description?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showIcon: boolean;
  icon: IconName;
  showEndIcon: boolean;
  endIcon: IconName;
  testId?: string;
}

function TextboxStoryWrapper({
  showDescription,
  description,
  error,
  placeholder,
  value,
  disabled,
  readOnly,
  clearable,
  showIcon,
  icon,
  showEndIcon,
  endIcon,
  testId,
}: TextboxStoryProps) {

  const IconComponent = showIcon ? getLucideIcon(icon) : null;
  const EndIconComponent = showEndIcon ? getLucideIcon(endIcon) : null;
  const iconNode = IconComponent ? <IconComponent size={ICON_PX} /> : undefined;
  const endIconNode = EndIconComponent ? (
    <EndIconComponent size={ICON_PX} />
  ) : undefined;
  return (
    <Textbox
      description={showDescription ? description : undefined}
      error={error}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      clearable={clearable}
      icon={iconNode}
      endIcon={endIconNode}
      testId={testId}
    />
  );
}

const meta = {
  id: "components-textbox",
  title: "Components/Textbox",
  component: TextboxStoryWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Textbox – single-line input (no label in Figma). Optional description; error state; icon, endIcon. States: default, focused, disabled, error, read-only. Figma 851-25000, 851-24737. Use Lucide React for icon and endIcon.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showDescription: {
      control: "boolean",
      description: "Show optional description text below the input",
    },
    description: {
      control: "text",
      description: "Helper text below the input (when show description is on)",
      if: { arg: "showDescription" },
    },
    error: {
      control: "text",
      description: "Error (Figma): error message, enables error state",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Input value (e.g. for read-only)",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state (value visible but not editable)",
    },
    clearable: {
      control: "boolean",
      description: "Show clear (X) when input has value",
    },
    showIcon: {
      control: "boolean",
      description: "Show leading icon (Lucide)",
    },
    icon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Leading icon (Lucide)",
      if: { arg: "showIcon" },
    },
    showEndIcon: {
      control: "boolean",
      description: "Show trailing icon (Lucide)",
    },
    endIcon: {
      control: "select",
      options: ICON_OPTIONS,
      description: "Trailing icon (Lucide)",
      if: { arg: "showEndIcon" },
    },
    testId: {
      control: "text",
      description: "data-testid for testing",
    },
  },
  args: {
    showDescription: false,
  },
} satisfies Meta<typeof TextboxStoryWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
};

export const WithoutDescription: Story = {
  args: {
    showDescription: false,
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
  parameters: {
    docs: {
      description: { story: "Description is optional; no helper text below." },
    },
  },
};

export const WithStartIcon: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: false,
    endIcon: "ChevronDown",
  },
};

export const WithEndIcon: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
};

export const Clearable: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: false,
    endIcon: "ChevronDown",
  },
  render: function ClearableStory() {
    const [value, setValue] = useState("Label Text");
    return (
      <Textbox
        placeholder="Label Text"
        description="Description text will come here"
        icon={<LucideIcons.Search size={ICON_PX} />}
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focused/active state with clear (X) when input has value. Uses Lucide X for clear.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: false,
    endIcon: "ChevronDown",
    error: "Error text will come here",
  },
};

export const Focused: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
  render: function FocusedStory(args) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    const IconComponent = getLucideIcon(args.icon);
    const EndIconComponent = getLucideIcon(args.endIcon);
    return (
      <Textbox
        ref={inputRef}
        description={args.showDescription ? args.description : undefined}
        error={args.error}
        placeholder={args.placeholder}
        disabled={args.disabled}
        readOnly={args.readOnly}
        clearable={args.clearable}
        icon={IconComponent ? <IconComponent size={ICON_PX} /> : undefined}
        endIcon={EndIconComponent ? <EndIconComponent size={ICON_PX} /> : undefined}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focused state: input is focused on load (blue border).",
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    placeholder: "Label Text",
    value: "Label Text",
    readOnly: true,
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
  parameters: {
    docs: {
      description: {
        story: "Read-only state: value is visible but not editable.",
      },
    },
  },
};


/** All states – matches Figma 851-24737. */
export const AllStates: Story = {
  args: {
    showDescription: true,
    description: "Description text will come here",
    showIcon: true,
    icon: "Search",
    showEndIcon: true,
    endIcon: "ChevronDown",
  },
  render: function AllStatesStory() {
    const focusedRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      focusedRef.current?.focus();
    }, []);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "320px",
        }}
      >
        <Textbox
          placeholder="Label Text"
          description="Description text will come here"
          icon={<LucideIcons.Search size={ICON_PX} />}
          endIcon={<LucideIcons.ChevronDown size={ICON_PX} />}
        />
        <Textbox
          ref={focusedRef}
          placeholder="Label Text"
          description="Description text will come here"
          icon={<LucideIcons.Search size={ICON_PX} />}
          clearable
          defaultValue="Label Text"
          onClear={() => {}}
        />
        <Textbox
          placeholder="Label Text"
          description="Description text will come here"
          icon={<LucideIcons.Search size={ICON_PX} />}
          endIcon={<LucideIcons.ChevronDown size={ICON_PX} />}
          disabled
        />
        <Textbox
          placeholder="Label Text"
          description="Description text will come here"
          value="Label Text"
          readOnly
          icon={<LucideIcons.Search size={ICON_PX} />}
          endIcon={<LucideIcons.ChevronDown size={ICON_PX} />}
        />
        <Textbox
          placeholder="Label Text"
          icon={<LucideIcons.Search size={ICON_PX} />}
          error="Error text will come here"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default, focused (with clear), disabled, read-only, error — matches Figma 851-24737.",
      },
    },
  },
};

