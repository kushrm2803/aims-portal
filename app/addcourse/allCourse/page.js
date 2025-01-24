"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router for navigation

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/course");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses);  // Assuming API returns { courses: [...] }
        console.log("data:: " + data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch("http://localhost:3000/api/student/enrollment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials : "include",
        body: JSON.stringify({ courseId }), // Pass courseId in the body
      });

      const result = await response.json();
      if (response.ok) {
        alert("Successfully enrolled in the course!");

        // Update the course list UI
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId ? { ...course, enrolled: true } : course
          )
        );
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course");
    }
  };

  // Handle redirection to the "View Students" page
  const handleViewStudents = (courseId) => {
    router.push(`/addcourse/${courseId}`);
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading courses...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Course List</h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available.</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded shadow-md bg-gray-100 dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {course.courseName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Code: {course.courseCode}</p>
              <p className="text-gray-600 dark:text-gray-400">Credits: {course.courseCredit}</p>
              <p className="text-gray-600 dark:text-gray-400">Instructor: {course.professor.name}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEnroll(course._id)} // Enroll button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Enroll
                </button>

                <button
                  onClick={() => handleViewStudents(course._id)} // View Students button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  View Students
                </button>
              </div>

              {course.enrolled && (
                <span className="mt-4 text-green-600 font-medium">Enrolled</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
