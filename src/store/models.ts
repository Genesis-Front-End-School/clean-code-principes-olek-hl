import { ActionCreatorsMapObject } from "redux";
import { ICoursesOvervieReducer } from "../containers/CoursesOverview/logic/models";
import { ICourseViewReducer } from "../containers/CourseView/logic/models";
import { IAppHeaderReducer } from "../containers/AppHeader/logic/models";

export interface IRootState {
  coursesOverview: ICoursesOvervieReducer;
  courseView: ICourseViewReducer;
  settings: IAppHeaderReducer;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;
