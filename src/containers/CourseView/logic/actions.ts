import * as types from "./types";
import { ActionsUnion } from "../../../store/models";

export const CourseViewActions = {
  getCourceData: (courseId: string) => ({
    type: types.GET_COURSE_DATA,
    payload: { courseId },
  }),
  clearCourseData: () => ({
    type: types.CLEAR_COURSE_DATA,
  }),
};

export type ActionsType = ActionsUnion<typeof CourseViewActions>;
