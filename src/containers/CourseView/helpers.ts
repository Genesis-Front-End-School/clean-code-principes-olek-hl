import { ICourseLesson, IGetLessonProgressArgs } from "./logic/models";

export const getLocalStorage = () => {
  return window.localStorage;
};

export const getLocalStorageItem = (item: string) => {
  return getLocalStorage().getItem(item) || "{}";
};

export const getParsedLocalStorageItem = (item: string) => {
  return JSON.parse(getLocalStorageItem(item)) || {};
};

export const setLocalStorageItem = (item: string, data: object) => {
  getLocalStorage().setItem(item, JSON.stringify(data));
};

export const calculateLessonProgress = (
  currentTime: number,
  currentLesson: ICourseLesson,
  prevProgress: string
) => {
  return Math.max(
    (currentTime / (currentLesson?.duration || Infinity)) * 100,
    Number(prevProgress || "0")
  ).toFixed(0);
};

export const updateProgressInLocalStorage = (
  currentTime: number,
  currentCourseId: string,
  currentLesson?: ICourseLesson
) => {
  if (!currentLesson) {
    return;
  }
  let savedProgress = getParsedLocalStorageItem("progress");
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
          progress: calculateLessonProgress(
            currentTime,
            currentLesson,
            savedProgress?.courses?.[`${currentCourseId}`]?.[
              `${currentLesson?.id}`
            ]?.progress
          ),
        },
      },
    },
  };
  setLocalStorageItem("progress", savedProgress);
};

export const getLessonProgressValue = ({
  link,
  courseId,
  lessonId,
}: IGetLessonProgressArgs): number => {
  if (!link) {
    return 0;
  }
  const userProgress = getParsedLocalStorageItem("progress");
  const curentLessonProgress =
    userProgress?.courses?.[courseId]?.[lessonId]?.progress;
  return curentLessonProgress ?? 0;
};
