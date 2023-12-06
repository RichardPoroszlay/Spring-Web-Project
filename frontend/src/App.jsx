import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DefaultNavbar,
  StudentTable,
  Hero,
  SubjectTable,
  AddStudent,
  EditStudent,
  AddSubject,
  EditSubject,
  PreviewSubject,
} from "./components";
import PreviewStudent from "./components/PreviewStudent";

function App() {
  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/get-students" element={<StudentTable />} />
        <Route path="/get-subjects" element={<SubjectTable />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/edit-subject/:id" element={<EditSubject />} />
        <Route path="/student/:id" element={<PreviewStudent />} />
        <Route path="/subject/:id" element={<PreviewSubject />} />
      </Routes>
    </div>
  );
}

export default App;