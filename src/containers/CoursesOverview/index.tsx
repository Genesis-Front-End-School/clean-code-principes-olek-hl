import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Loader, CourceCard } from "../../components";
import { IRootState } from "../../store/models";
import CoursesOverviewActions from "./logic/actions";
import { ICoursesOvervieReducer } from "./logic/models";
import { COURSES_PER_PAGE } from "./config";

import "./styles.css";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CoursesOverviewActions;
  courses: ICoursesOvervieReducer;
}

const Courses = ({ actions, courses }: ICoursesOverview) => {
  const [corsesOnPage, setCoursesOnPage] = useState(COURSES_PER_PAGE);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getCourcesOverview();
  }, [actions]);

  const handleOnShowMoreClick = () => {
    setCoursesOnPage((prev) => prev + COURSES_PER_PAGE);
  };

  const onCourseClick = (id: string) => {
    navigate(`/courses/${id}`);
  };
// гадаю можна реструктуризувати courses перед цим рядком і використати реструктуризовану data
  const showLoadMoreButton = corsesOnPage <= (courses.data || []).length;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { isFetching, data } = courses;

  if (isFetching || !data) {
    return <Loader isFullPage />;
  }

  return (
    <div className="overview-wrapper">
      <Typography
        variant={isSmall ? "h4" : "h2"}
        component="div"
        style={{
          margin: "5px 2px",
          padding: isSmall ? "20px 30px" : "20px 100px",
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
              <CourceCard courseData={course} onCourseClick={onCourseClick} />
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CoursesOverviewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Courses);
