"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import notificationLogo from "../../public/navbar-logos/notification-logo.svg";
import Dropdown from "../dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const currentPath = usePathname() || "/";
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      fetchUserData(user.role, user.email);
    }
  }, [user, loading]);

  const fetchUserData = async (role, email) => {
    try {
      const response = await fetch(`/api/profile/${role}/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setUserData({
        name: data.name || "Unknown",
        photo: data.photo || "/default-profile.png",
      });
    } catch (err) {
      setError(err.message);
    }
  };
  // if (loading) return <p>Loading...</p>;
console.log("User from context:", user);


  const tabs = [
    { label: "Home", path: "/home" },
    { label: "Student Record", path: "/student-record", roles: ["student"] },
    { label: "Current Semester", path: "/current-semester", roles: ["student"] },
    { label: "Courses", path: "/courses", roles: ["student"] },
    { label: "My Courses", path: "/faculty/my-courses", roles: ["professor"] },
    { label: "Create Course", path: "/faculty/create-course", roles: ["professor"] },
    { label: "Student Applications", path: "/admin/student-applications", roles: ["admin"] },
    { label: "User Management", path: "/admin/user-management", roles: ["admin"] },
    { label: "Course Management", path: "/admin/course-management", roles: ["admin"] },
    { label: "Result Management", path: "/admin/result-management", roles: ["admin"] },
    { label: "About", path: "/about" },
    { label: "Help", path: "/help" },
  ];

  const notificationMenuItems = [
    { label: "News1", description: "CGPA updated" },
    { label: "News2", description: "New Semester started" },
    { label: "News3", description: "New Course floated" },
    { label: "News4", description: "Check your grades" },
  ];

  const profileMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Logout"},
  ];

  useEffect(() => {
    if (!loading) {
      setMounted(true);
    }
  }, [loading]);
  

  const isActiveTab = (path) => {
    if (path === "/") {
      return currentPath === "/" || currentPath === "";
    }
    return currentPath === path;
  };

  if (!mounted || loading) {
    // Render a loading placeholder while user data is being fetched
    return (
      <nav className="bg-gray-800 text-white w-9/10 mx-3 my-4 px-6 rounded-2xl flex justify-center items-center shadow-lg h-16">
        <p>Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white w-9/10 mx-3 my-4 px-6 rounded-2xl flex justify-between items-center shadow-lg">
      <div className="text-xl font-bold hover:scale-105 transition duration-300 ease-in-out transform">
        <Link href="/">AIMS-IIT Ropar</Link>
      </div>

      <div className="space-x-6 flex items-center">
        {tabs
          .filter((tab) => !tab.roles || tab.roles.includes(user?.role)) // Only show tabs allowed for the user's role
          .map((tab, index) => (
          <Link
            key={index}
            href={tab.path}
            className={`${
              isActiveTab(tab.path)
                ? "scale-110 bg-gray-700 text-white rounded-xl shadow-md font-bold px-4 py-2"
                : "scale-100 hover:text-gray-400 transition duration-300 ease-in-out transform cursor-pointer"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <Dropdown
          icon={
            <Image
              src={notificationLogo}
              alt="Notification-icon"
              width={24}
              height={24}
            />
          }
          menuItems={notificationMenuItems}
        />
        <Dropdown
         
         icon={
          userData ? (
            <Image
              src={userData.photo}
              alt="profile-icon"
              width={40}
              height={40}
              className="rounded-full border border-gray-400"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-500 rounded-full" />
          )
        }
          menuItems={profileMenuItems}
        />
      </div>
    </nav>
  );
};

export default Navbar;
