import { useEffect, useState } from "react";
import classNames from "classnames";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Loader, CourceCard } from "../../components";
import { IRootState } from "../../store/models";
import { CoursesOverviewActions } from "./logic/actions";
import { ICoursesOvervieReducer } from "./logic/models";
import { COURSES_PER_PAGE } from "./config";
import { AppTheme } from "../AppHeader/logic/models";

import "./styles.css";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CoursesOverviewActions;
  courses: ICoursesOvervieReducer;
  appTheme: AppTheme;
}

const Courses = ({ actions, courses, appTheme }: ICoursesOverview) => {
  const [corsesOnPage, setCoursesOnPage] = useState<number>(COURSES_PER_PAGE);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    actions.getCourcesOverview();
  }, [actions]);

  const handleOnShowMoreClick = () => {
    setCoursesOnPage((prev) => prev + COURSES_PER_PAGE);
  };

  const onCourseClick = (id: string) => {
    navigate(`/courses/${id}`);
  };

  const showLoadMoreButton = corsesOnPage < (courses.data || []).length;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const isDarkTheme = appTheme === AppTheme.Dark;

  const { isFetching, data } = courses;

  if (isFetching || !data) {
    return <Loader isFullPage isDarkTheme={isDarkTheme} />;
  }

  return (
    <div
      className={classNames("overview-wrapper", {
        "is-dark-body": isDarkTheme,
      })}
    >
      <Typography
        variant={isSmall ? "h4" : "h2"}
        component="div"
        style={{
          margin: "5px 2px",
          padding: isSmall ? "20px 30px" : "20px 100px",
          color: isDarkTheme ? "white" : "black",
        }}
      >
        Select your course:{" "}
      </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        style={{
          minHeight: "80vh",
          padding: isSmall ? "20px 30px" : "20px 100px",
        }}
      >
        {data?.slice(0, corsesOnPage).map((course, i) => {
          return (
            <Grid key={`${course.id}`} item xs={12} sm={6} md={4} lg={3}>
              <CourceCard
                courseData={course}
                onCourseClick={onCourseClick}
                isDarkTheme={isDarkTheme}
              />
            </Grid>
          );
        })}
      </Grid>
      {showLoadMoreButton && (
        <Button
          variant="contained"
          onClick={handleOnShowMoreClick}
          className="load-more-button"
        >
          Show more
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  courses: state.coursesOverview,
  appTheme: state.settings.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CoursesOverviewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Courses);
