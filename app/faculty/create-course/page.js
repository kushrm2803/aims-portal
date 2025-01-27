'use client';

import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  // Adding missing state variables for course details
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCredit, setCourseCredit] = useState('');
  const [semesterOffered, setSemesterOffered] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/faculty/create-course', {
        courseName,
        courseCode,
        courseCredit,
        semesterOffered, // Include all the necessary fields
      });
      alert(response.data.message);
      setCourseName('');
      setCourseCode('');
      setCourseCredit('');
      setSemesterOffered('');
    } catch (error) {
      alert('Error creating course: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Create New Course</h1>
      <form onSubmit={handleSubmit} className="course-form">
        {/* Course Name Input */}
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="input-field"
        />
        {/* Course Code Input */}
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
          className="input-field"
        />
        {/* Course Credit Input */}
        <input
          type="number"
          placeholder="Course Credit"
          value={courseCredit}
          onChange={(e) => setCourseCredit(e.target.value)}
          required
          className="input-field"
        />
        {/* Semester Offered Input */}
        <input
          type="text"
          placeholder="Semester Offered"
          value={semesterOffered}
          onChange={(e) => setSemesterOffered(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
