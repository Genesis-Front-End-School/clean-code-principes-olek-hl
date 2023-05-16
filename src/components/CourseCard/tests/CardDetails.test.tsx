import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import CardDetails from "../CardDetails";

const mockProps = {
  rating: 4,
  tags: ["React", "Vue", "Angular"],
};

describe("Card details test", () => {
  test("should show all passed tegs and rating", () => {
    const { getByTestId, getByText } = render(<CardDetails {...mockProps} />);

    expect(getByText(/React/i)).toBeDefined();
    expect(getByText(/Vue/i)).toBeDefined();
    expect(getByText(/Angular/i)).toBeDefined();

    const ratingElement = getByTestId("rating");
    expect(ratingElement).toBeDefined();
    expect(ratingElement.getAttribute("aria-label")).toBe("4 Stars");
  });
});
