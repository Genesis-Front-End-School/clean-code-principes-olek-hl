import {
  useEffect,
  useState,
  useRef,
  RefObject
} from "react";
import { useLocation } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { Typography, Divider, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect, ConnectedProps } from "react-redux";
import {
  Loader,
  VideoComponent,
  Lesson
} from "../../components";
import { IRootState } from "../../store/models";
import CourseViewActions from "./logic/actions";
import { updateProgressInLocalStorage } from "./helpers";
import {
  smallScreenStyles,
  videoSpeedUpKey,
  videoSpeedDownKey,
  MAX_PLAYBACK_RATE,
  MIN_PLAYBACK_RATE,
} from "./config";
import { ICourseViewReducer, LessonStatus } from "./logic/models";

import "./styles.css";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CourseViewActions;
  courseData: ICourseViewReducer;
}

const CourseView = ({ actions, courseData }: ICoursesOverview) => {
  const [videoLink, setVideoLink] = useState("");
  const [paused, setPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("Normal");
  const location = useLocation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const playerRef: RefObject<HTMLVideoElement> = useRef(null);

  const courseId = location.pathname.split("/").pop() || "";

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

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (!playerRef.current) {
        return;
      }
      switch (e.key) {
        case videoSpeedUpKey:
          playerRef.current.playbackRate = Math.min(
            playerRef.current.playbackRate + 0.5,
            MAX_PLAYBACK_RATE
          );
          setPlaybackSpeed(`${playerRef.current.playbackRate.toFixed(2)}`);
        case videoSpeedDownKey:
          playerRef.current.playbackRate = Math.max(
            playerRef.current.playbackRate - 0.25,
            MIN_PLAYBACK_RATE
          );
          setPlaybackSpeed(`${playerRef.current.playbackRate.toFixed(2)}`);
        default:
          return;
      }
    });
  }, []);

  const { isFetching, data } = courseData;

  const isCurrentlyPlaying = (link: string) => {
    return link === videoLink;
  };

  const handleLessonClick = (link: string) => {
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

  const onVideoProgress = (e: any) => {
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
    <>
      <div className={`course-lesson-video ${isSmall ? "small-size" : ""}`}>
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
        
        {!isSmall && (
          <Chip
            label={`Playback Speed: ${playbackSpeed.replace(
              "1.00",
              "Normal"
            )}. (Use 'l' button to speed up video or 'j' to slow it down)`}
          />
        )}
        
        {!isSmall && (
          <div className="course-description">
            <Typography
              variant={"subtitle1"}
              component="p"
              style={{
                margin: "15px 0",
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
              paused={paused}
              isCurrentlyPlaying={isCurrentlyPlaying}
              handleLessonClick={handleLessonClick}
              isSmall={isSmall}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  courseData: state.courseView,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CourseViewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CourseView);
