import * as types from "./types";
import { ActionsUnion } from "../../../store/models";
import { AppTheme } from "./models";

export const appHeaderActions = {
  setApplicationTheme: (theme: AppTheme) => ({
    type: types.SET_APP_THEME,
    payload: { theme },
  }),
};

export type ActionsType = ActionsUnion<typeof appHeaderActions>;
