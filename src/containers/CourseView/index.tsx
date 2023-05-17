import { useEffect, useState, useRef, RefObject } from "react";
import { useLocation } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import classNames from "classnames";
import { Typography, Divider, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect, ConnectedProps } from "react-redux";
import { Loader, VideoComponent, Lesson } from "../../components";
import { IRootState } from "../../store/models";
import { CourseViewActions } from "./logic/actions";
import { updateProgressInLocalStorage } from "./helpers";
import { smallScreenStyles, playbackRateCaption } from "./config";
import { ICourseViewReducer, LessonStatus } from "./logic/models";
import { AppTheme } from "../AppHeader/logic/models";
import usePaybackSpeedChange from "../../hooks/usePaybackSpeedChange";

import "./styles.css";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CourseViewActions;
  courseData: ICourseViewReducer;
  appTheme: AppTheme;
}

const CourseView = ({
  actions,
  courseData,
  appTheme,
}: ICoursesOverview): JSX.Element => {
  const [videoLink, setVideoLink] = useState<string>("");
  const [isVideoPaused, setPaused] = useState<boolean>(false);
  const location = useLocation();
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const playerRef: RefObject<HTMLVideoElement> = useRef(null);
  const playbackSpeed: string = usePaybackSpeedChange(playerRef);

  const isDarkTheme = appTheme === AppTheme.Dark;

  const courseId: string = location.pathname.split("/").pop() || "";

  useEffect(() => {
    actions.getCourceData(courseId);
    return () => {
      actions.clearCourseData();
    };
  }, [actions, location.pathname]);

  useEffect(() => {
    const firsUnlockedtLessonLink =
      courseData.data?.lessons?.find(
        (lesson) => lesson.status === LessonStatus.Unlocked
      )?.link || "";
    setVideoLink(firsUnlockedtLessonLink);
  }, [courseData.data]);

  const { isFetching, data } = courseData;

  const isCurrentlyPlaying = (link: string): boolean => {
    return link === videoLink;
  };

  const handleLessonClick = (link: string): void => {
    if (!link) {
      return;
    }
    const isPaused = playerRef.current?.paused;
    if (isCurrentlyPlaying(link)) {
      setPaused(!isPaused);
      isPaused ? playerRef.current?.play() : playerRef.current?.pause();
      return;
    }
    setPaused(false);
    setVideoLink(link);
  };

  const onVideoProgress = (e: React.ChangeEvent<HTMLVideoElement>): void => {
    const currentTime = e.target?.currentTime;
    const currentLesson = courseData.data?.lessons.find(
      (lesson) => lesson.link === videoLink
    );
    updateProgressInLocalStorage(currentTime, courseId, currentLesson);
  };

  if (isFetching || !data) {
    return <Loader isFullPage />;
  }

  return (
    <div
      className={classNames("course-wrapper", { "is-dark-theme": isDarkTheme })}
    >
      <div
        className={classNames("course-lesson-video", { "small-size": isSmall })}
      >
        <VideoComponent
          controls
          autoPlay
          videoUrl={videoLink || ""}
          position="static"
          muted
          playerRef={playerRef}
          onProgress={onVideoProgress}
        />
      </div>
      <div className="course-view-wrapper">
        <div className="course-title-rating">
          <Typography
            variant={isSmall ? "h6" : "h3"}
            component="div"
            style={{
              margin: "15px 15px 15px 0",
              color: isDarkTheme ? "white" : "black",
              ...(isSmall && smallScreenStyles),
            }}
          >
            {courseData.data?.title}
          </Typography>
          <Rating
            value={courseData.data?.rating}
            readOnly
            style={{ position: "static" }}
            size={isSmall ? "small" : "large"}
          />
        </div>
        {!isSmall && <Chip label={playbackRateCaption(playbackSpeed)} />}
        {!isSmall && (
          <div className="course-description">
            <Typography
              variant={"subtitle1"}
              component="p"
              style={{
                margin: "15px 0",
                color: isDarkTheme ? "white" : "black",
              }}
            >
              {courseData.data?.description}
            </Typography>
          </div>
        )}
        <Divider />
        <div className="course-lossons-list">
          {courseData.data?.lessons.map((lesson) => (
            <Lesson
              key={lesson.id}
              courseId={courseId}
              lesson={lesson}
              isPaused={isVideoPaused}
              isCurrentlyPlaying={isCurrentlyPlaying}
              handleLessonClick={handleLessonClick}
              isSmall={isSmall}
              isLocked={lesson.status === LessonStatus.Locked}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  courseData: state.courseView,
  appTheme: state.settings.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CourseViewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CourseView);
