import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import CardPreview from "../CardPreview";

const mockProps = {
  previewImageLink: "https://picsum.photos/200/300",
};

describe("Card preview test", () => {
  test("should show passed preview", () => {
    const { container } = render(<CardPreview {...mockProps} />);

    const previewImage = container.querySelector("img");

    expect(previewImage).toBeDefined();

    expect(previewImage?.getAttribute("src")).toBe(
      mockProps.previewImageLink + "/cover.webp"
    );
  });
});
