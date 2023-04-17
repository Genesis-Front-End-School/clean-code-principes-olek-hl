import * as types from "./types";

const CoursesOverviewActions = {
  // гадаю варто виправити помилку в назві на getCoursesOverview
  getCourcesOverview: () => ({
    type: types.GET_COURSES_OVERVIEW,
  }),
};

export default CoursesOverviewActions;
