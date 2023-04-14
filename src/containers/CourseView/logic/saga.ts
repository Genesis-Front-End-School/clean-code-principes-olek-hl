import { takeLatest, put } from "redux-saga/effects";
import * as types from "./types";
import { routes } from "../../../api/routes";
import CommonActions from "../../../store/actions";

function* callGetCourseData(action: any) {
  try {
    yield put(
      CommonActions.makeHttpRequest(
        routes.getCourseData(action.payload.courseId),
        types.GET_COURSE_DATA_DONE
      )
    );
  } catch (error) {
    yield put({
      type: types.GET_COURSE_DATA_FAIL,
      error,
    });
  }
}

export default function* courseViewSaga() {
  yield takeLatest(types.GET_COURSE_DATA, callGetCourseData);
}
