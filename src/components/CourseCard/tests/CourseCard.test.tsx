import { describe, expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import CourceCard, { ICourseCardProps } from "../index";

export const mockCourseInfo: ICourseCardProps = {
  isDarkTheme: false,
  courseData: {
    id: "123",
    title: "Mock Course",
    tags: ["React", "Material-UI", "Testing"],
    launchDate: "2023-05-01",
    status: "Active",
    description: "This is a mock course for testing purposes.",
    duration: 60,
    lessonsCount: 10,
    containsLockedLessons: false,
    previewImageLink: "https://example.com/mock-image.jpg",
    rating: 4.5,
    meta: {
      slug: "John Doe",
      skills: ["Intermediate"],
      courseVideoPreview: {
        link: "",
        duration: 300,
        previewImageLink: "",
      },
    },
  },
};

describe("Cource Card behaviour", () => {
  test("should show video on hover", () => {
    const { container } = render(<CourceCard {...mockCourseInfo} />);

    const cardContainer = container;

    expect(cardContainer).toBeDefined();
    const videoContainer = container.querySelector("previe-video-container");
    expect(videoContainer).toBeNull();
    fireEvent.mouseEnter(cardContainer);
    expect(videoContainer).toBeDefined();
    fireEvent.mouseLeave(cardContainer);
    expect(videoContainer).toBeNull();
  });
});
