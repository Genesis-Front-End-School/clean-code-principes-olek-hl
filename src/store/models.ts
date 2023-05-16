import { ActionCreatorsMapObject } from "redux";
import { ICoursesOvervieReducer } from "../containers/CoursesOverview/logic/models";
import { ICourseViewReducer } from "../containers/CourseView/logic/models";

export interface IRootState {
  coursesOverview: ICoursesOvervieReducer;
  courseView: ICourseViewReducer;
  theme?: "dark" | "light";
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
