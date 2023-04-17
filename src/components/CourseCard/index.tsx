import { useState, useRef, RefObject } from "react";
import { Typography, Divider, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import VideoComponent from "../Video";
import { ICourseInfo } from "../../containers/CoursesOverview/logic/models";

import "./styles.css";

export interface ICourseCardProps {
  courseData: ICourseInfo;
  onCourseClick: (id: string) => void;
}
// гадаю варто виправити назву компоненту на CourseCard
const CourceCard = (props: ICourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const playerRef: RefObject<HTMLVideoElement> = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onImageError = (e: any) => {
    e.target.src =
      "https://img.freepik.com/free-vector/online-education-flat-illustration-composition-with-computers-content-books-with-human-characters_1284-54101.jpg";
  };

  const { courseData, onCourseClick } = props;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      {isHovered && (
        <VideoComponent
          videoUrl={courseData?.meta.courseVideoPreview?.link}
          onVideoClick={() => onCourseClick(courseData.id)}
          playerRef={playerRef}
        />
      )}
      <div className="card-container">
        <div className="card-preview">
          <img
            src={`${courseData?.previewImageLink}/cover.webp`}
            alt="corse-previe-img"
            onError={onImageError}
          />
        </div>
        <Divider />
        <div className="course-title">
          <Typography
            variant="h6"
            component="div"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              margin: "5px 2px",
            }}
          >
            {courseData?.title}
          </Typography>
        </div>
        <div className="course-details">
          <Divider />
          <Rating
            value={courseData?.rating}
            readOnly
            style={{ marginTop: 5, position: "static" }}
          />
        </div>
        <div className="course-tags">
          {courseData.tags.map((tag, i) => {
            return <Chip key={i} label={tag} style={{ marginRight: 5 }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CourceCard;
