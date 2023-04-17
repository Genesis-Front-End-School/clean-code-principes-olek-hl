// гадаю варто видалити з імпорту те що не використовується (useState, useEffect, Divider)
import { useState, useMemo, useEffect } from "react";
import { Typography, Divider, Chip } from "@material-ui/core";
import { LockClock, Pause, PlayCircle } from "@mui/icons-material";
import { toMinutesAndSeconds } from "../../services";
import {
  ICourseLesson,
  LessonStatus,
} from "../../containers/CourseView/logic/models";

import "./styles.css";

export interface ICourseLessonProps {
  lesson: ICourseLesson;
  paused: boolean;
  courseId: string;
  isSmall: boolean;
  isCurrentlyPlaying: (link: string) => boolean;
  handleLessonClick: (link: string) => void;
}

const CourceLesson = (props: ICourseLessonProps) => {
  const {
    lesson: { id, title, duration, order, status, link, previewImageLink },
    courseId,
    paused,
    isSmall,
    isCurrentlyPlaying,
    handleLessonClick,
  } = props;

  const isLocked = status === LessonStatus.Locked;

  const isPlaying = isCurrentlyPlaying(link);

  const lessonStatusIcon = useMemo(() => {
    if (isLocked) {
      return <LockClock />;
    }
    if (isPlaying) {
      return paused ? <PlayCircle color={"secondary"} /> : <Pause />;
    }
    return <PlayCircle />;
  }, [isLocked, paused, isPlaying]);

  const progressValue = useMemo(() => {
    if (!link) {
      return 0;
    }
    const localStorage = window.localStorage;
    const userProgress = JSON.parse(localStorage.getItem("progress") || "{}");
    const curentLessonProgress =
      userProgress?.courses?.[courseId]?.[id]?.progress;
    return curentLessonProgress ?? 0;
  }, [window.localStorage, courseId, id, link]);

  return (
    <div
      className={`course-lesson-wrapper ${isLocked ? "locked" : ""} ${
        isSmall ? "small-size" : ""
      }`}
      onClick={() => (isLocked ? null : handleLessonClick(link))}
    >
      <div className="lesson-status-cell cell">{lessonStatusIcon}</div>
      {!isSmall && (
        <div className="lesson-duration-cell cell">
          <Typography
            variant="h6"
            component="span"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {toMinutesAndSeconds(duration)}
          </Typography>
        </div>
      )}
      {!isSmall && (
        <div className="lesson-image-cell cell">
          <img
            src={`${previewImageLink}/lesson-${order}.webp`}
            alt="lesson-image"
          />
        </div>
      )}
      <div className="lesson-title-cell cell">
        <Typography
          variant="h6"
          component="span"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            ...(isSmall && isCurrentlyPlaying(link) && { color: "#9c27b0" }),
          }}
        >
          {title}
        </Typography>
      </div>
      <div className="lesson-progress-cell cell">
        <Typography variant="caption" component="span">
          {`${isSmall ? "" : "Progress: "}${progressValue}%`}
        </Typography>
      </div>
      {!isSmall && (
        <div className="lesson-currently-playing cell">
          {isPlaying && <Chip label="Currently playing" color={"secondary"} />}
        </div>
      )}
    </div>
  );
};

export default CourceLesson;
