import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import type { AvatarSize, AvatarVariant } from "./Avatar.types";

const meta = {
  id: "components-avatar",
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Circular avatar showing image or initials. Three sizes, four color variants (info, success, warning, danger). Built from Figma: Orion v2.0 (node 67-2956).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    initials: {
      control: "text",
      description: "Initials when no image (e.g. SS). Uppercase recommended.",
    },
    src: {
      control: "text",
      description:
        "Optional image URL; when set, image is shown instead of initials.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"] as AvatarSize[],
      description: "Avatar size",
    },
    variant: {
      control: "select",
      options: [1, 2, 3, 4] as AvatarVariant[],
      description: "Color variant (1=info, 2=success, 3=warning, 4=danger)",
    },
    alt: {
      control: "text",
      description: "Alt text for image; use name for accessibility.",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: "SS",
    size: "medium",
    variant: 1,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    size: "large",
  },
};

export const Variant1: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    variant: 1,
  },
};

export const Variant2: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    variant: 2,
  },
};

export const Variant3: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    variant: 3,
  },
};

export const Variant4: Story = {
  args: {
    ...Default.args,
    initials: "SS",
    variant: 4,
  },
};

export const AllSizesAndVariants: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
        gap: 24,
        alignItems: "center",
      }}
    >
      {(["small", "medium", "large"] as const).map((size) =>
        ([1, 2, 3, 4] as const).map((variant) => (
          <Avatar
            key={`${size}-${variant}`}
            initials="SS"
            size={size}
            variant={variant}
          />
        ))
      )}
    </div>
  ),
};
