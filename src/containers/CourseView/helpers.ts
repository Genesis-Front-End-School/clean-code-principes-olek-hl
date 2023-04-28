import { ICourseLesson, IGetLessonProgressArgs } from "./logic/models";

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

export const getLessonProgressValue = ({
  link,
  courseId,
  lessonId,
}: IGetLessonProgressArgs): number => {
  if (!link) {
    return 0;
  }
  const localStorage = window.localStorage;
  const userProgress = JSON.parse(localStorage.getItem("progress") || "{}");
  const curentLessonProgress =
    userProgress?.courses?.[courseId]?.[lessonId]?.progress;
  return curentLessonProgress ?? 0;
};
