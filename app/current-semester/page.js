"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the custom hook to access user context
import CourseTable from "@/components/current-semester/CourseTable";

const CurrentSemesterPage = () => {
  const { user } = useAuth(); // Retrieve the user data (which includes studentId)
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // Prevent fetching if the user data is not available

    const fetchCourses = async (id) => {
      try {
        const response = await fetch(`/api/student/courses?studentId=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses(user.id); // Pass the studentId from the context
  }, [user]);

  const handleWithdraw = async (courseId) => {
    alert(`Course with ID ${courseId} withdrawn.`);
  };

  const handleAudit = async (courseId) => {
    alert(`Course with ID ${courseId} audited.`);
  };

  const handleDrop = async (courseId) => {
    alert(`Course with ID ${courseId} dropped.`);
  };

  if (loading) {
    return <div className="text-center text-white">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-9/10 mx-3 my-4 py-3 px-6 rounded-2xl items-center">
      <h1 className="text-4xl font-bold mb-6">Current Semester</h1>

      {courses.length > 0 ? (
        <CourseTable
          courses={courses}
          onWithdraw={handleWithdraw}
          onAudit={handleAudit}
          onDrop={handleDrop}
        />
      ) : (
        <p className="text-gray-400">No courses enrolled yet.</p>
      )}
    </div>
  );
};

export default CurrentSemesterPage;
