'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '@/components/courses/CourseCard';


const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCourses, setAllCourses] = useState([]);  // Store all courses for filtering

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('/api/student/get-approved-courses');
      setAllCourses(response.data);
      setFilteredCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);

    if (query === '') {
      setFilteredCourses(allCourses);
    } else {
      const filtered = allCourses.filter((course) =>
        course.name.toLowerCase().includes(query)
      );
      setFilteredCourses(filtered);
    }
  };



  const handleCredit = async (courseId) => {
   
   // Replace with actual student ID (from context, localStorage, or props)
  
    try {
      const response = await axios.post('/api/student/enroll-request', {
        courseId
      });
  
      if (response.status === 200) {
        alert(`Credit request sent successfully for course ID: ${courseId}. Awaiting admin approval.`);
      } else {
        alert(`Failed to send request: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error sending credit request:', error);
      alert('An error occurred while sending the request. Please try again.');
    }
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
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-400">No courses found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onCredit={() => handleCredit(course._id)}
              onMinor={handleMinor}
              onConcentration={handleConcentration}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
