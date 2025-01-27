"use client";
import { useState } from "react";

export default function CreateBatch() {
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/create-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batch, department, facultyEmail }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Batch created successfully!");
      setBatch("");
      setDepartment("");
      setFacultyEmail("");
    } else {
      setMessage(`Error: ${data.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Batch</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Batch (e.g. 2023)"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Department"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Faculty Advisor Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={facultyEmail}
            onChange={(e) => setFacultyEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Batch"}
          </button>
        </form>

        {message && <p className="text-center mt-4 font-semibold text-green-600">{message}</p>}
      </div>
    </div>
  );
}
