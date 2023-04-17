// гадаю варто виправити помилку в назві на ICoursesOverviewReducer
export interface ICoursesOvervieReducer {
  data: ICourseInfo[] | null;
  isFetching: boolean;
  error: any;
}

export interface ICourseInfo {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: ICourseMeta;
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
