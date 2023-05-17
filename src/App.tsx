import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Courses, CourseView, AppHeader } from "./containers";

import "./App.css";

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseView />} />
      </Routes>
    </Router>
  );
}

export default App;
