export const routes = {
  getToken: "/auth/anonymous?platform=subscriptions",
  getCourses: "/core/preview-courses",
  getCourseData: (courseId: string) => `/core/preview-courses/${courseId}`,
};
