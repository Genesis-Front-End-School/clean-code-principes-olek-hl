import React from "react";
import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Loader from "../index";

const loaderMock = {
  isFullPage: true,
};

describe("Loader should shows", () => {
  test("should show a loader", () => {
    const { container } = render(<Loader {...loaderMock} />);

    const previewImage = container.querySelector(".full-page-loader");

    expect(previewImage).toBeDefined();
  });
});
