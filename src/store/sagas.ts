import { all, fork, take, takeEvery, put, call } from "redux-saga/effects";
import * as types from "./types";
import coursesOverviewSaga from "../containers/CoursesOverview/logic/saga";
import courseViewSaga from "../containers/CourseView/logic/saga";
import { host, apiVersion } from "../api/config";
import { routes } from "../api/routes";
import { Actions as commonActions } from "./actions";

function* callValidateJsonResponse(
  resObj: Response
): Generator<unknown, unknown, unknown> {
  try {
    const response = yield resObj.json();
    return response;
  } catch (error) {
    return {};
  }
}

function* callMakeHttpRequest(
  action: ReturnType<(typeof commonActions)["makeHttpRequest"]>
): Generator<unknown, void, any> {
  const {
    payload: { route, type: actionType },
  } = action;
  const localStorage = window.localStorage;
  let token = localStorage.getItem("token");
  try {
    if (!token) {
      token = yield call(callGetApiToken);
    }

    const request = new Request(`${host}${apiVersion}${route}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const resObj: Response = yield fetch(request);
    const response = yield call(callValidateJsonResponse, resObj);
    yield put({
      type: actionType,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: types.MAKE_HTTP_REQUEST_FAIL,
      error,
    });
  }
}

function* callGetApiToken(): Generator<unknown, void, any> {
  const request = new Request(`${host}${apiVersion}${routes.getToken}`);
  try {
    const resObj: Response = yield fetch(request);
    const response = yield call(callValidateJsonResponse, resObj);

    const localStorage = window.localStorage;
    localStorage.setItem("token", response.token);

    return response.token;
  } catch (error) {
    yield put({
      type: types.GET_API_TOKEN_FAIL,
      error,
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(types.MAKE_HTTP_REQUEST, callMakeHttpRequest);
  yield takeEvery(types.GET_API_TOKEN, callGetApiToken);
  yield all([fork(coursesOverviewSaga), fork(courseViewSaga)]);
}
