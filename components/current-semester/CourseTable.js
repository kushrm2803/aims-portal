import React from "react";

const CourseTable = ({ courses, onWithdraw, onAudit, onDrop }) => {
  return (
    <section className="w-9/12 max-w-7xl bg-gray-800 rounded-2xl py-6 px-4 shadow-lg my-6">
      <h2 className="text-2xl font-bold mb-4">Current Semester Courses</h2>
      <table className="table-auto w-full text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-4 text-left">Course Name</th>
            <th className="py-2 px-4 text-center">Credits</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id || index} className="border-b border-gray-700">
              <td className="py-2 px-4 text-left">{course.courseName}</td>
              <td className="py-2 px-4 text-center">{course.courseCredit}</td>
              <td className="py-2 px-4 text-center space-x-4">
                <button
                  className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
                  onClick={() => onWithdraw(course._id)}
                >
                  Withdraw
                </button>
                <button
                  className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
                  onClick={() => onAudit(course._id)}
                >
                  Audit
                </button>
                <button
                  className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-xl hover:bg-gray-600 transition"
                  onClick={() => onDrop(course._id)}
                >
                  Drop
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CourseTable;
