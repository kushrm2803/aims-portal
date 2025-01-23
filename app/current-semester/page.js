'use client'

import React, { useState, useEffect } from "react";
import CourseTable from "@/components/current-semester/CourseTable";

const CurrentSemesterPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = [
        { id: 1, name: "Advanced Algorithms", credits: 4 },
        { id: 2, name: "Operating Systems", credits: 3 },
        { id: 3, name: "Database Systems", credits: 3 },
        { id: 4, name: "TOC", credits: 4 },
        { id: 5, name: "Computer Networks", credits: 3 },
        { id: 6, name: "Software Engineering", credits: 3 },
      ];
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleWithdraw = (courseId) => {
    alert(`Course with ID ${courseId} withdrawn.`);
  };

  const handleAudit = (courseId) => {
    alert(`Course with ID ${courseId} audited.`);
  };

  const handleDrop = (courseId) => {
    alert(`Course with ID ${courseId} dropped.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-9/10 mx-3 my-4 py-3 px-6 rounded-2xl items-center">
      <h1 className="text-4xl font-bold mb-6">Current Semester</h1>

      <CourseTable
        courses={courses}
        onWithdraw={handleWithdraw}
        onAudit={handleAudit}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default CurrentSemesterPage;
