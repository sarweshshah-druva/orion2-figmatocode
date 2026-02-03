import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no src", () => {
    render(<Avatar initials="SS" />);
    expect(screen.getByText("SS")).toBeInTheDocument();
  });

  it("renders with role img and aria-label", () => {
    render(<Avatar initials="AB" alt="Alice Brown" />);
    const el = screen.getByRole("img", { name: /alice brown/i });
    expect(el).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(
      <Avatar initials="SS" src="https://example.com/photo.jpg" alt="User" />
    );
    const img = document.querySelector(".orion-avatar__image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
    expect(img).toHaveAttribute("alt", "User");
  });

  it("applies size classes", () => {
    const { container } = render(<Avatar initials="SS" size="small" />);
    expect(container.querySelector(".orion-avatar")).toHaveClass(
      "orion-avatar--small"
    );
  });

  it("applies variant classes", () => {
    const { container } = render(<Avatar initials="SS" variant={2} />);
    expect(container.querySelector(".orion-avatar")).toHaveClass(
      "orion-avatar--variant-2"
    );
  });

  it("applies testId when provided", () => {
    render(<Avatar initials="SS" testId="user-avatar" />);
    expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
  });

  it("uses default aria-label when no alt", () => {
    render(<Avatar initials="XY" />);
    expect(screen.getByRole("img", { name: /xy avatar/i })).toBeInTheDocument();
  });
});
