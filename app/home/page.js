import Link from "next/link";
import React, { Children } from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded;
}

export default async function HomePage() {
  const token = await getUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-9/10 mx-3 my-4 py-3 px-6 rounded-2xl items-center">
      <section className="w-9/10 max-w-7xl bg-gray-800 text-center py-16 px-6 rounded-2xl shadow-lg my-6 transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold mb-4">Welcome to AIMS - IIT Ropar</h1>
        <p className="text-lg mb-6 text-gray-300">
          Your ultimate platform for managing student records, courses, and
          academic information effortlessly.
        </p>
        <h1>{token.email || "No email found"}</h1>
        <Link href="/login">
          <button className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-gray-600 transition">
            Get Started
          </button>
        </Link>
      </section>

      <section className="w-9/10 max-w-7xl py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Student Records</h2>
          <p className="text-gray-300">
            View, manage, and analyze detailed records of students in a secure
            and accessible way.
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Courses</h2>
          <p className="text-gray-300">
            Explore current and upcoming courses for the semester and manage
            enrollments.
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Help Center</h2>
          <p className="text-gray-300">
            Find solutions to your questions or get in touch with support for
            assistance.
          </p>
        </div>
      </section>

      <section className="w-9/10 max-w-7xl bg-gray-800 rounded-2xl py-10 px-6 shadow-lg my-6 text-center transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
        <ul className="text-gray-300 space-y-4">
          <li>New courses for the semester have been added. Check them out!</li>
          <li>
            Student record management features improved for better performance.
          </li>
          <li>Upcoming semester begins on January 2nd.</li>
        </ul>
      </section>

      <section className="w-9/10 max-w-7xl bg-gray-700 text-center py-12 px-6 rounded-2xl shadow-lg my-6 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-4">
          Contribute to the AIMS Community
        </h2>
        <p className="text-lg mb-6">
          AIMS Community is Open-Sourced, and we welcome contributions from
          developers, students, and educators.
        </p>
        <p className="text-lg mb-6">
          Join our efforts to build an open and collaborative ecosystem, where
          everyone can freely access, share, and enhance the resources provided
          by AIMS. Explore our codebase, report issues, suggest features, or
          even submit a pull request to help us grow!
        </p>
        <Link href="https://github.com/kushrm2803/aims-portal" target="_blank">
          <button className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-700 transition">
            Learn More
          </button>
        </Link>
      </section>
    </div>
  );
}
