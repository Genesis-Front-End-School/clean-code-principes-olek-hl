import { takeLatest, put } from "redux-saga/effects";
import * as types from "./types";
import { routes } from "../../../api/routes";
import { Actions as commonAction } from "../../../store/actions";
import { CourseViewActions } from "./actions";

function* callGetCourseData(
  action: ReturnType<(typeof CourseViewActions)["getCourceData"]>
) {
  try {
    yield put(
      commonAction.makeHttpRequest(
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
