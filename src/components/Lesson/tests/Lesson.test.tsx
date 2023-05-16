import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import CourceLesson, {
  LessonImageCell,
  LessonStatusIconCell,
  LessonDurationCell,
  LessonTitleCell,
  LessonProgressCell,
} from "../index";

const mockLessonCellProps = {
  order: 3,
  previewImageLink: "https://picsum.photos/200/300",
};

const mockLessonStatusCellProps = {
  isLocked: true,
  isPlaying: false,
  isPaused: false,
};

const mockPlayingLessonStatusCellProps = {
  isLocked: false,
  isPlaying: true,
  isPaused: false,
};

const mockLessonDurationCellProps = {
  duration: 125,
};

describe("Test lesson image cell", () => {
  test("should show a lesson image", () => {
    const { container } = render(<LessonImageCell {...mockLessonCellProps} />);

    const previewImage = container.querySelector("img");

    expect(previewImage).toBeDefined();

    expect(previewImage?.getAttribute("src")).toBe(
      `${mockLessonCellProps.previewImageLink}/lesson-${mockLessonCellProps.order}.webp`
    );
  });
});

describe("Test lesson status icon cell", () => {
  test("should show a lock icon", () => {
    const { container, getByTestId } = render(
      <LessonStatusIconCell {...mockLessonStatusCellProps} />
    );

    const iconElement = getByTestId("LockClockIcon");
    expect(iconElement).toBeDefined();
  });
});

describe("Test lesson status icon cell", () => {
  test("should show a playing icon", () => {
    const { container, getByTestId } = render(
      <LessonStatusIconCell {...mockPlayingLessonStatusCellProps} />
    );

    const iconElement = getByTestId("PauseIcon");
    expect(iconElement).toBeDefined();
  });
});

describe("Test lesson duration cell", () => {
  test("should show a lesson duration", () => {
    const { getByText } = render(
      <LessonDurationCell {...mockLessonDurationCellProps} />
    );

    expect(getByText(/2:05/i)).toBeDefined();
  });
});
