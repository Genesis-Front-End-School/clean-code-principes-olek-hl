export interface ICardPreviewProps {
  previewImageLink: string;
}

const CourseCardPreview = ({ previewImageLink }: ICardPreviewProps) => {
  return (
    <div className="card-preview">
      <img src={`${previewImageLink}/cover.webp`} alt="corse-previe-img" />
    </div>
  );
};

export default CourseCardPreview;
