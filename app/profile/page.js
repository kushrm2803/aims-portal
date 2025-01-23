import React from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";

const ProfilePage = () => {
  // Mock data, replace with MongoDB queries later
  const userData = {
    name: "John Doe",
    role: "Student",
    photo: "https://via.placeholder.com/150",
    details: [
      { label: "Email", value: "john.doe@iitrpr.ac.in" },
      { label: "Phone", value: "+91 234 567 890" },
      { label: "Department", value: "Computer Science" },
      { label: "Enrollment Year", value: "2022" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-9/10 mx-3 my-4 py-3 px-6 rounded-2xl items-center">
      <ProfileHeader name={userData.name} role={userData.role} photo={userData.photo} />
      <ProfileDetails details={userData.details} />
    </div>
  );
};

export default ProfilePage;