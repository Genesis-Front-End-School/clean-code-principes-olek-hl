import { takeLatest, put } from "redux-saga/effects";
import * as types from "./types";
import { routes } from "../../../api/routes";
import { Actions as CommonActions } from "../../../store/actions";

function* callGetCoursesList(): any {
  try {
    yield put(
      CommonActions.makeHttpRequest(
        routes.getCourses,
        types.GET_COURSES_OVERVIEW_DONE
      )
    );
  } catch (error) {
    yield put({
      type: types.GET_COURSES_OVERVIEW_FAIL,
      error,
    });
  }
}

export default function* courseOverviewSaga() {
  yield takeLatest(types.GET_COURSES_OVERVIEW, callGetCoursesList);
}
