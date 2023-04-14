import * as types from "./types";

const CommonActions = {
  makeHttpRequest: (route: string, type: string) => ({
    type: types.MAKE_HTTP_REQUEST,
    payload: { route, type },
  }),
  getApiToken: () => ({
    type: types.GET_API_TOKEN,
  }),
};

export default CommonActions;
