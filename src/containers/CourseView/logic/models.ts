export interface ICourseViewReducer {
  data: ICourseData | null;
  isFetching: boolean;
  error: any;
}

export interface ICourseData {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: ICourseMeta;
  lessons: ICourseLesson[];
}

export interface ICourseMeta {
  slug: string;
  skills: string[];
  courseVideoPreview: ICourseVideoPreview;
}

export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface ICourseLesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: LessonStatus;
  link: string;
  previewImageLink: string;
}

export enum LessonStatus {
  Locked = "locked",
  Unlocked = "unlocked",
}
