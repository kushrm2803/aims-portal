'use client'

import React, { useState } from "react";
import axios from "axios"; // Ensure the path to axios is correct


const CreateUser = () => {
  const [userType, setUserType] = useState('student');  // Default to student
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [facultyAdvisor, setFacultyAdvisor] = useState('');
  const [batch, setBatch] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let userData = { name, email };
  
    if (userType === "student") {
      userData = { ...userData, rollNumber, batch };
    } else if (userType === "faculty") {
      userData = { ...userData, department };
    }
  
    try {
      if (userType === 'student') {
        await axios.post('/api/admin/create-student', userData);
        alert('Student created successfully');
      } else {
        await axios.post('/api/admin/create-faculty', userData);
        alert('Faculty created successfully');
      }
  
      // Reset the form
      setEmail('');
      setName('');
      setPhone('');
      setRollNumber('');
      setDepartment('');
      setFacultyAdvisor('');
      setBatch('');
    } catch (error) {
      alert('Error creating user: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="create-user-container">
      <h2 className="form-title">Create {userType === 'student' ? 'Student' : 'Faculty'}</h2>
      
      <form onSubmit={handleSubmit} className="create-user-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input-field"
          required
        />

       

        {userType === 'student' && (  <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Roll Number"
          className="input-field"
          required
        />)}
        {userType === 'student' && (
  <>
    
    <input
      type="text"
      value={batch}
      onChange={(e) => setBatch(e.target.value)}
      placeholder="Batch"
      className="input-field"
      required
    />
  </>
)}


        {/* Conditionally render department input for Faculty */}
        {userType === 'faculty' && (
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            className="input-field"
            required
          />
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : userType === 'student' ? 'Create Student' : 'Create Faculty'}
        </button>
      </form>

      {/* Toggle button */}
      <div className="toggle-btn-container">
        <label className="toggle-label">Create as:</label>
        <div className="toggle-btn">
          <span onClick={() => setUserType('student')} className={`toggle-option ${userType === 'student' ? 'active' : ''}`}>
            Student
          </span>
          <span onClick={() => setUserType('faculty')} className={`toggle-option ${userType === 'faculty' ? 'active' : ''}`}>
            Faculty
          </span>
        </div>
      </div>

      <style jsx>{`
        /* Your existing styles for the form, button, and container */
        /* Example styles below */
        .create-user-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .create-user-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-field {
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background-color: #fff;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          border-color: #0056b3;
          outline: none;
        }

        .submit-btn {
          padding: 12px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #0056b3;
        }

        /* Toggle Button Styling */
        .toggle-btn-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .toggle-label {
          font-size: 18px;
          font-weight: 600;
        }

        .toggle-btn {
          display: flex;
          justify-content: space-between;
          background-color: #f1f1f1;
          border-radius: 30px;
          padding: 5px;
          cursor: pointer;
        }

        .toggle-option {
          width: 48%;
          padding: 10px;
          text-align: center;
          border-radius: 30px;
          background-color: #e0e0e0;
          font-size: 16px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .toggle-option:hover {
          background-color: #ddd;
        }

        .toggle-option.active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CreateUser;
