import * as types from "./types";

const CourseViewActions = {
  getCourceData: (courseId: string) => ({
    type: types.GET_COURSE_DATA,
    payload: { courseId },
  }),
  clearCourseData: () => ({
    type: types.CLEAR_COURSE_DATA,
  }),
};

export default CourseViewActions;
