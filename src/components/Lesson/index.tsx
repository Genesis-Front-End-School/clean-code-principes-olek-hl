import classNames from "classnames";
import { Typography, Chip } from "@material-ui/core";
import { LockClock, Pause, PlayCircle } from "@mui/icons-material";
import { getLessonProgressValue } from "../../containers/CourseView/helpers";
import { toMinutesAndSeconds } from "../../services";
import { typoCommonStyles } from "./config";
import {
  ILessonImageProps,
  ILessonStatusIconProps,
  ILessonDurationProps,
  ILessonTitleProps,
  ILessonProgressCellProps,
  ICourseLessonProps,
} from "./models";

import "./styles.css";

export const LessonImageCell = ({
  previewImageLink,
  order,
}: ILessonImageProps) => {
  return (
    <div className="lesson-image-cell cell">
      <img
        src={`${previewImageLink}/lesson-${order}.webp`}
        alt="lesson-image"
      />
    </div>
  );
};

export const LessonStatusIconCell = ({
  isLocked,
  isPlaying,
  isPaused,
}: ILessonStatusIconProps) => {
  if (isLocked) {
    return <LockClock />;
  }
  if (isPlaying) {
    return isPaused ? <PlayCircle color={"secondary"} /> : <Pause />;
  }
  return <PlayCircle />;
};

export const LessonDurationCell = ({ duration }: ILessonDurationProps) => {
  return (
    <div className="lesson-duration-cell cell">
      <Typography variant="h6" component="span" style={typoCommonStyles}>
        {toMinutesAndSeconds(duration)}
      </Typography>
    </div>
  );
};

export const LessonTitleCell = ({
  title,
  isSmall,
  isCurrentlyPlaying,
  link,
}: ILessonTitleProps) => {
  return (
    <div className="lesson-title-cell cell">
      <Typography
        variant="h6"
        component="span"
        style={{
          ...typoCommonStyles,
          ...(isSmall && isCurrentlyPlaying(link) && { color: "#9c27b0" }),
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

export const LessonProgressCell = ({
  progressValue,
  isSmall,
}: ILessonProgressCellProps) => {
  return (
    <div className="lesson-progress-cell cell">
      <Typography variant="caption" component="span">
        {`${isSmall ? "" : "Progress: "}${progressValue}%`}
      </Typography>
    </div>
  );
};

export const LessonCurrentlyPlayingCell = ({
  isPlaying,
}: {
  isPlaying: boolean;
}) => {
  return (
    <div className="lesson-currently-playing cell">
      {isPlaying && <Chip label="Currently playing" color={"secondary"} />}
    </div>
  );
};

const CourceLesson = (props: ICourseLessonProps) => {
  const {
    lesson: { id, title, duration, order, link, previewImageLink },
    courseId,
    isPaused,
    isSmall,
    isLocked,
    isCurrentlyPlaying,
    handleLessonClick,
  } = props;

  const isPlaying = isCurrentlyPlaying(link);

  const progressValue = getLessonProgressValue({
    link,
    courseId,
    lessonId: id,
  });

  return (
    <div
      className={classNames("course-lesson-wrapper", {
        locked: isLocked,
        "small-size": isSmall,
      })}
      onClick={() => (isLocked ? null : handleLessonClick(link))}
    >
      <div className="lesson-status-cell cell">
        <LessonStatusIconCell
          isLocked={isLocked}
          isPaused={isPaused}
          isPlaying={isPlaying}
        />
      </div>
      {!isSmall && <LessonDurationCell duration={duration} />}
      {!isSmall && (
        <LessonImageCell previewImageLink={previewImageLink} order={order} />
      )}
      <LessonTitleCell
        title={title}
        isSmall={isSmall}
        isCurrentlyPlaying={isCurrentlyPlaying}
        link={link}
      />
      <LessonProgressCell progressValue={progressValue} isSmall={isSmall} />
      {!isSmall && <LessonCurrentlyPlayingCell isPlaying={isPlaying} />}
    </div>
  );
};

export default CourceLesson;
