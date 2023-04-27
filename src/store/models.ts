import { ICoursesOvervieReducer } from "../containers/CoursesOverview/logic/models";
import { ICourseViewReducer } from "../containers/CourseView/logic/models";

export interface IRootState {
  coursesOverview: ICoursesOvervieReducer;
  courseView: ICourseViewReducer;
}
