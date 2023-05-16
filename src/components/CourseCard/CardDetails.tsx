import { Divider, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export interface ICardPreviewProps {
  rating: number;
  tags: string[];
}

const CourseCardDetails = ({ rating, tags }: ICardPreviewProps) => {
  return (
    <>
      <div className="course-details">
        <Divider />
        <Rating
          value={rating}
          readOnly
          style={{ marginTop: 5, position: "static" }}
          data-testid="rating"
        />
      </div>
      <div className="course-tags">
        {tags.map((tag, i) => {
          return <Chip key={i} label={tag} style={{ marginRight: 5 }} />;
        })}
      </div>
    </>
  );
};

export default CourseCardDetails;
