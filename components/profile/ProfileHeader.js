import React from "react";

const ProfileHeader = ({ name, role, photo }) => {
  return (
    <section className="w-full max-w-7xl bg-gray-800 text-center py-3 px-6 rounded-2xl shadow-lg my-6 transform transition duration-500 hover:scale-105">
      <img
        src={photo}
        alt="Profile Photo"
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-700"
      />
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <p className="text-lg text-gray-300">{role}</p>
    </section>
  );
};

export default ProfileHeader;