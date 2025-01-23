'use client'
import React, { useState } from "react";
import CourseCard from "@/components/courses/CourseCard";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  const handleSearch = async () => {
    const data = [
      { id: 1, name: "Machine Learning", credits: 4 },
      { id: 2, name: "Artificial Intelligence", credits: 3 },
      { id: 3, name: "Data Science", credits: 3 },
    ];
    setCourses(data.filter(course => course.name.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const handleCredit = (courseId) => {
    alert(`Course with ID ${courseId} credited.`);
  };

  const handleMinor = (courseId) => {
    alert(`Course with ID ${courseId} credited for minor.`);
  };

  const handleConcentration = (courseId) => {
    alert(`Course with ID ${courseId} credited for concentration.`);
  };

  const handleViewDetails = (courseId) => {
    alert(`Details for course ID ${courseId} shown.`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-9/10 mx-3 my-4 py-3 px-6 rounded-2xl items-center">
      <h1 className="text-4xl font-bold mb-6">Search Courses</h1>

      <div className="w-full max-w-2xl mb-6">
        <input
          type="text"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-xl"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-xl hover:bg-gray-600 transition mt-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onCredit={handleCredit}
            onMinor={handleMinor}
            onConcentration={handleConcentration}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
