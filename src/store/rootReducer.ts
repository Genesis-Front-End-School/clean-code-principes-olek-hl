import { combineReducers } from "redux";
import coursesOverviewReducer from "../containers/CoursesOverview/logic/reducer";
import courseViewReducer from "../containers/CourseView/logic/reducer";
import { IRootState } from "./models";

const rootReducer = combineReducers<IRootState>({
  coursesOverview: coursesOverviewReducer,
  courseView: courseViewReducer,
});

export default rootReducer;
