'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        // Axios request with credentials to include cookies
        const response = await axios.get('/api/faculty/courses', {
          withCredentials: true,  // This ensures cookies are sent with the request
        });

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length > 0 ? (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{course.courseName}</h3>
              <p className="text-gray-600">Code: {course.courseCode}</p>
              <p>Credits: {course.courseCredit}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    course.adminApproval === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {course.adminApproval}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default MyCourses;
