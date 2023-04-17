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
  // при зміні прогресу на одному відео, зчитується і зберігається прогрес одразу на всіх відео. Гадаю варто спробувати змінити логіку, щоб прогрес тільки одного конкретного відео зчитувався і зберігався.
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
