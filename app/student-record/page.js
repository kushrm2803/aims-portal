"use client";
import React, { useEffect, useState } from "react";
import SemesterTable from "@/components/student-record/SemesterTable";

const StudentRecordPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          semesterNumber: 1,
          courses: [
            { name: "MA101", credits: 4, grade: "A" },
            { name: "PH101", credits: 3, grade: "B" },
            { name: "CS101", credits: 3, grade: "C" },
            { name: "CY101", credits: 3, grade: "B-" },
            { name: "GE101", credits: 3, grade: "A" },
            { name: "HS101", credits: 3, grade: "B-" },
          ],
          totalCredits: 20,
          earnedCredits: 20,
        },
        {
          semesterNumber: 2,
          courses: [
            { name: "MA102", credits: 4, grade: "A-" },
            { name: "PH102", credits: 3, grade: "C" },
            { name: "CS102", credits: 3, grade: "C-" },
            { name: "CY102", credits: 3, grade: "B-" },
            { name: "GE102", credits: 3, grade: "B" },
            { name: "HS102", credits: 3, grade: "B-" },
          ],
          totalCredits: 40,
          earnedCredits: 20,
        },
      ];
      setRecords(data);
    };

    fetchData();
  }, []);

  const calculateCGPA = (records) => {
    let totalPoints = 0;
    let totalCredits = 0;
    const cumulativeCGPAs = [];

    records.forEach(({ courses }) => {
      courses.forEach(({ grade, credits }) => {
        const gradePoint =
          {
            A: 10,
            "A-": 9,
            B: 8,
            "B-": 7,
            C: 6,
            "C-": 5,
            D: 4,
            F: 0,
          }[grade] || 0;

        totalPoints += gradePoint * credits;
        totalCredits += credits;
      });

      const cgpa =
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A";
      cumulativeCGPAs.push(cgpa);
    });

    return cumulativeCGPAs;
  };

  const cumulativeCGPAs = calculateCGPA(records);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
      <h1 className="w-full max-w-4xl bg-gray-800 rounded-2xl py-4 px-6 shadow-lg mb-8 text-center text-3xl font-bold text-white">
        Student Record
      </h1>

      {records.map((record, index) => (
        <SemesterTable
          key={index}
          {...record}
          cumulativeCGPA={cumulativeCGPAs[index]}
        />
      ))}

      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl py-6 px-6 shadow-lg mt-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Cumulative Performance
        </h2>
        <p className="text-lg text-gray-300">
          <strong>Overall CGPA:</strong>{" "}
          {cumulativeCGPAs[cumulativeCGPAs.length - 1] || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default StudentRecordPage;
