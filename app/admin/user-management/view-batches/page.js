"use client";
import { useState } from "react";

export default function ViewBatches() {
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      ...(batch && { batch }),
      ...(department && { department }),
      ...(facultyEmail && { facultyEmail }),
    }).toString();

    const response = await fetch(`/api/admin/get-batch?${query}`);
    const data = await response.json();
    
    if (response.ok) {
      setBatches(data.batches);
    } else {
      setBatches([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">View Batches</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Batch (e.g. 2023)"
            className="p-3 border border-gray-300 rounded-lg"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            className="p-3 border border-gray-300 rounded-lg"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="email"
            placeholder="Faculty Email"
            className="p-3 border border-gray-300 rounded-lg"
            value={facultyEmail}
            onChange={(e) => setFacultyEmail(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg mt-4"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Batches"}
        </button>

        <div className="mt-6">
          {batches.length > 0 ? (
            <ul className="space-y-4">
              {batches.map((b) => (
                <li key={b._id} className="p-4 bg-gray-50 border-l-4 border-blue-500 shadow-sm rounded-lg">
                  <p className="text-lg font-bold">Batch: {b.batch}</p>
                  <p className="text-gray-700">Department: {b.department}</p>
                  <p className="text-gray-700">
                    Faculty Advisor: {b.facultyAdvisor.name} ({b.facultyAdvisor.email})
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 mt-4">No batches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
