import React from "react";

const CourseCard = ({ course, onCredit, onMinor, onConcentration, onViewDetails }) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-500 hover:scale-105">
      <h3 className="text-2xl font-bold mb-3">{course.name}</h3>
      <p className="text-gray-300 mb-4">Credits: {course.credits}</p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
          onClick={() => onCredit(course.id)}
        >
          Credit
        </button>
        <button
          className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
          onClick={() => onMinor(course.id)}
        >
          Credit for Minor
        </button>
        <button
          className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
          onClick={() => onConcentration(course.id)}
        >
          Credit for Concentration
        </button>
        <button
          className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
          onClick={() => onViewDetails(course.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
