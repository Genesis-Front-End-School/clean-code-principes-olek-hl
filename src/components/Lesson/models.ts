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
  isDarkTheme?: boolean;
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
  isDarkTheme?: boolean;
}

export interface ILessonTitleProps {
  title: string;
  isSmall: boolean;
  isCurrentlyPlaying: (link: string) => boolean;
  link: string;
  isDarkTheme?: boolean;
}

export interface ILessonProgressCellProps {
  progressValue: number;
  isSmall: boolean;
  isDarkTheme?: boolean;
}
