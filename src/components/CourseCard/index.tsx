import { useState, useRef, RefObject } from "react";
import { Typography, Divider } from "@material-ui/core";
import { commonTypoStyles } from "./config";
import VideoComponent from "../Video";
import { ICourseInfo } from "../../containers/CoursesOverview/logic/models";
import CourseCardPreview from "./CardPreview";
import CourseCardDetails from "./CardDetails";

import "./styles.css";

export interface ICourseCardProps {
  courseData: ICourseInfo;
  isDarkTheme: boolean;
  onCourseClick?: (id: string) => void;
}

const CourceCard = (props: ICourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const playerRef: RefObject<HTMLVideoElement> = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const {
    courseData: { title, meta, id, previewImageLink, rating, tags },
    onCourseClick,
    isDarkTheme,
  } = props;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      {isHovered && (
        <VideoComponent
          videoUrl={meta.courseVideoPreview?.link}
          onVideoClick={() => onCourseClick?.(id)}
          playerRef={playerRef}
        />
      )}
      <div className="card-container">
        <CourseCardPreview previewImageLink={previewImageLink} />
        <Divider />
        <div className="course-title">
          <Typography
            variant="h6"
            component="div"
            style={{
              ...commonTypoStyles,
              color: isDarkTheme ? "white" : "black",
            }}
          >
            {title}
          </Typography>
        </div>
        <CourseCardDetails rating={rating} tags={tags} />
      </div>
    </div>
  );
};

export default CourceCard;
