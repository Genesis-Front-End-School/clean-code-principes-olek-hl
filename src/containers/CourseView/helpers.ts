import { ICourseLesson } from "./logic/models";

export const updateProgressInLocalStorage = (
  currentTime: number,
  currentCourseId: string,
  currentLesson?: ICourseLesson
) => {
  if (!currentLesson) {
    return;
  }
  const localStorage = window.localStorage;
  let savedProgress =
    JSON.parse(localStorage.getItem("progress") || "{}") || {};
  savedProgress = {
    ...savedProgress,
    courses: {
      ...savedProgress?.courses,
      [`${currentCourseId}`]: {
        ...savedProgress.courses?.[`${currentCourseId}`],
        [`${currentLesson?.id}`]: {
          ...savedProgress.courses?.[`${currentCourseId}`]?.[
            `${currentLesson?.id}`
          ],
          progress: Math.max(
            (currentTime / (currentLesson?.duration || Infinity)) * 100,
            Number(
              savedProgress?.courses?.[`${currentCourseId}`]?.[
                `${currentLesson?.id}`
              ]?.progress || "0"
            )
          ).toFixed(0),
        },
      },
    },
  };
  localStorage.setItem("progress", JSON.stringify(savedProgress));
};
