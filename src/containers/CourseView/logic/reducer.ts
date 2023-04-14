import { Action } from "redux";
import * as types from "./types";
import { initState } from "./state";
import { ICourseViewReducer } from "./models";

export interface Actions extends Action {
  payload: any;
}

const courseViewReducer = (
  state: ICourseViewReducer = initState,
  action: Actions
) => {
  switch (action.type) {
    case types.GET_COURSE_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_COURSE_DATA_DONE:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case types.CLEAR_COURSE_DATA:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export default courseViewReducer;
