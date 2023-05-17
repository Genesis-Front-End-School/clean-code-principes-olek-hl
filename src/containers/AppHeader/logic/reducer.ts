import { Action } from "redux";
import * as types from "./types";
import { initState } from "./state";
import { AppTheme, IAppHeaderReducer } from "./models";

export interface Actions extends Action {
  payload: { theme: AppTheme };
}

const appHeaderReducer = (
  state: IAppHeaderReducer = initState,
  action: Actions
) => {
  switch (action.type) {
    case types.SET_APP_THEME:
      return {
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};

export default appHeaderReducer;
