# DEMO - https://courses-ew35.vercel.app/

# Course Viewer

A web application that allows users to view a course and keep track of their progress, built with React and Material UI.

## Features

- Course overview page
  - Show a list of courses.
- Course view page with the following features:
  - Displays the first гтдщслув video from the course, course details, and a list of lessons
  - When a lesson is clicked (if it is not locked), the current video will open and the user will know which lesson they are watching
  - Progress of the video and lesson are saved locally
  - If a lesson is locked, it will be indicated to the user
  - Additional features:
    1. Picture-in-picture functionality:
       - The video can be displayed on top of the page by clicking on it. The video will be positioned in the lower right corner of the page and the user can navigate to other pages while the video is still playing.
    2. Change playback speed via keyboard:
       - The user can change the playback speed of the video via keyboard shortcuts. Instructions for using this feature will be displayed near the video.

# Installation

<code>npm install --force</code>

<code>npm run dev</code>
