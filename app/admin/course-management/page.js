'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApprovalRequests = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        const response = await axios.get('/api/admin/get-pending-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching pending courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCourses();
  }, []);

  const handleApproveCourse = async (courseId) => {
    try {
      const response = await axios.put(`/api/admin/approve-course/${courseId}`);
      alert(response.data.message); // Show approval success message
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error approving course:', error);
      alert('Failed to approve the course.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Course Requests</h1>
      {loading ? (
        <p>Loading pending courses...</p>
      ) : courses.length > 0 ? (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{course.courseName}</h3>
              <p className="text-gray-600">Code: {course.courseCode}</p>
              <p>Credits: {course.courseCredit}</p>
              <p>Professor: {course.professor?.name || 'Unknown'}</p>
              <p>Status: <span className="text-yellow-500">{course.adminApproval}</span></p>
              <button
                onClick={() => handleApproveCourse(course._id)}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending courses found.</p>
      )}
    </div>
  );
};

export default AdminApprovalRequests;
