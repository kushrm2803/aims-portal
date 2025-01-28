'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/faculty/student-applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      await axios.post('/api/faculty/student-applications/decision', { id, status });
      setApplications((prev) => prev.filter((app) => app.id !== id));
      alert(`Application ${status}`);
    } catch (error) {
      alert('Error updating application: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Student Applications</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length > 0 ? (
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <p><strong>Name:</strong> {app.studentName}</p>
              <p><strong>Course:</strong> {app.courseTitle}</p>
              <button onClick={() => handleDecision(app.id, 'approved')} className="approve-btn">Approve</button>
              <button onClick={() => handleDecision(app.id, 'rejected')} className="reject-btn">Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications pending.</p>
      )}
    </div>
  );
};

export default StudentApplications;
