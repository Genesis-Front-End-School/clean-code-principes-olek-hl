import * as types from "./types";
import { ActionsUnion } from "./models";

export const Actions = {
  makeHttpRequest: (route: string, type: string) => ({
    type: types.MAKE_HTTP_REQUEST,
    payload: { route, type },
  }),
  getApiToken: () => ({
    type: types.GET_API_TOKEN,
  }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
