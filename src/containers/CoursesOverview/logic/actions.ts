import * as types from "./types";
import { ActionsUnion } from "../../../store/models";

export const CoursesOverviewActions = {
  getCourcesOverview: () => ({
    type: types.GET_COURSES_OVERVIEW,
  }),
};

export type ActionsType = ActionsUnion<typeof CoursesOverviewActions>;
