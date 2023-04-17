import { Action } from "redux";
import * as types from "./types";
import { initState } from "./state";
import { ICoursesOvervieReducer } from "./models";

export interface Actions extends Action {
    // гадаю не варто використовувати тип any
  payload: any;
}

const coursesOverviewReducer = (
  state: ICoursesOvervieReducer = initState,
  action: Actions
) => {
  switch (action.type) {
    case types.GET_COURSES_OVERVIEW:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_COURSES_OVERVIEW_DONE:
      return {
        ...state,
        isFetching: false,
        data: action.payload.courses,
      };
    default:
      return state;
  }
};

export default coursesOverviewReducer;
