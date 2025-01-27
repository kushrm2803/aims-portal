import React from "react";

const CourseCard = ({ course, onCredit, onMinor, onConcentration, onViewDetails }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-500 hover:scale-105">
      <h3 className="text-2xl font-bold mb-3 text-white">{course.courseName}</h3>
      <p className="text-gray-400 mb-2">Course Code: {course.courseCode}</p>
      <p className="text-gray-400 mb-4">Credits: {course.courseCredit}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          onClick={() => onCredit(course._id)}
        >
          Credit
        </button>
        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-600 transition"
          onClick={() => onMinor(course._id)}
        >
          Credit for Minor
        </button>
        <button
          className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-purple-600 transition"
          onClick={() => onConcentration(course._id)}
        >
          Credit for Concentration
        </button>
        <button
          className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-xl hover:bg-gray-600 transition"
          onClick={() => onViewDetails(course._id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
