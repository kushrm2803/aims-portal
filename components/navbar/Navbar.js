"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import notificationLogo from "../../public/navbar-logos/notification-logo.svg";
import Dropdown from "../dropdown/Dropdown";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const currentPath = usePathname() || "/";

  const tabs = [
    { label: "Home", path: "/home" },
    { label: "Student Record", path: "/student-record" },
    { label: "Current Semester", path: "/current-semester" },
    { label: "Courses", path: "/courses" },
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
    setMounted(true);
  }, []);

  const isActiveTab = (path) => {
    if (path === "/") {
      return currentPath === "/" || currentPath === "";
    }
    return currentPath === path;
  };

  if (!mounted) return null;

  return (
    <nav className="bg-gray-800 text-white w-9/10 mx-3 my-4 px-6 rounded-2xl flex justify-between items-center shadow-lg">
      <div className="text-xl font-bold hover:scale-105 transition duration-300 ease-in-out transform">
        <Link href="/">AIMS-IIT Ropar</Link>
      </div>

      <div className="space-x-6 flex items-center">
        {tabs.map((tab, index) => (
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
          icon={<Image src="" alt="profile-icon" width={24} height={24} />}
          menuItems={profileMenuItems}
        />
      </div>
    </nav>
  );
};

export default Navbar;
