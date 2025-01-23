import React from "react";

const ProfileDetails = ({ details }) => {
  return (
    <section className="w-9/12 max-w-7xl bg-gray-800 rounded-2xl py-12 px-6 shadow-lg my-6 transform transition duration-500 hover:scale-105">
      <h2 className="text-3xl font-bold mb-4 text-center">Profile Details</h2>
      <ul className="text-gray-300 space-y-4">
        {details.map((detail, index) => (
          <li
            key={index}
            className="flex justify-between py-2 border-b border-gray-700"
          >
            <span className="font-semibold">{detail.label}:</span>
            <span>{detail.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileDetails;
