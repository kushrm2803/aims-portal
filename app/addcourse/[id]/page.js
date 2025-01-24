"use client";

import { useState, useEffect } from "react";
import { use } from "react";

const CourseDetailsPage = ({ params }) => {
//   const { id } = use(params);  // Correct way to unwrap params
    const id = "6793d062c25a6c73d8826896"
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;  // Ensure id is available before making the request

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/course/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        console.log(data.course)
        setStudents(data.course.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading students...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Enrolled Students
      </h1>
      {students.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <ul className="space-y-4">
            {students.map((student) => (
              <li key={student._id} className="flex justify-between items-center border-b pb-2">
                <p className="text-lg font-medium text-gray-700">{student.name}</p>
                <p className="text-gray-500">{student.email}</p>
                <p className="text-gray-500">{student.email}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No students enrolled yet.</p>
      )}
    </div>
  );
};

export default CourseDetailsPage;
