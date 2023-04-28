export interface ILessonRowProps {
  id: string;
  title: string;
  duration: number;
  order: number;
  link: string;
  previewImageLink: string;
}

export interface ICourseLessonProps {
  lesson: ILessonRowProps;
  isPaused: boolean;
  isLocked: boolean;
  courseId: string;
  isSmall: boolean;
  isCurrentlyPlaying: (link: string) => boolean;
  handleLessonClick: (link: string) => void;
}

export interface ILessonImageProps {
  previewImageLink: string;
  order: number;
}

export interface ILessonStatusIconProps {
  isLocked: boolean;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface ILessonDurationProps {
  duration: number;
}

export interface ILessonTitleProps {
  title: string;
  isSmall: boolean;
  isCurrentlyPlaying: (link: string) => boolean;
  link: string;
}

export interface ILessonProgressCellProps {
  progressValue: number;
  isSmall: boolean;
}
