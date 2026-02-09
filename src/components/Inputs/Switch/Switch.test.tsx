import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with role switch", () => {
    render(<Switch leftLabel="Off" rightLabel="On" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders left and right labels", () => {
    render(<Switch leftLabel="Left" rightLabel="Right" />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("renders with only left label", () => {
    render(<Switch leftLabel="Only left" />);
    expect(screen.getByText("Only left")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with only right label", () => {
    render(<Switch rightLabel="Only right" />);
    expect(screen.getByText("Only right")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("warns in dev when neither label is provided", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Switch />);
    expect(spy).toHaveBeenCalledWith(
      "Switch: At least one of leftLabel or rightLabel must be provided."
    );
    spy.mockRestore();
  });

  it("renders optional left description below left label", () => {
    render(
      <Switch leftLabel="Left" rightLabel="Right" leftDescription="Left help" />
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Left help")).toBeInTheDocument();
  });

  it("renders optional right description below right label", () => {
    render(
      <Switch leftLabel="Left" rightLabel="Right" rightDescription="Right help" />
    );
    expect(screen.getByText("Right")).toBeInTheDocument();
    expect(screen.getByText("Right help")).toBeInTheDocument();
  });

  it("renders both optional descriptions when provided", () => {
    render(
      <Switch
        leftLabel="L"
        rightLabel="R"
        leftDescription="Left desc"
        rightDescription="Right desc"
      />
    );
    expect(screen.getByText("Left desc")).toBeInTheDocument();
    expect(screen.getByText("Right desc")).toBeInTheDocument();
  });

  it("respects checked state", () => {
    render(
      <Switch leftLabel="L" rightLabel="R" checked onChange={() => {}} />
    );
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("respects disabled state", () => {
    render(<Switch leftLabel="L" rightLabel="R" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Switch leftLabel="L" rightLabel="R" onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("applies testId to root", () => {
    render(<Switch leftLabel="L" rightLabel="R" testId="switch-1" />);
    expect(screen.getByTestId("switch-1")).toBeInTheDocument();
  });
});
