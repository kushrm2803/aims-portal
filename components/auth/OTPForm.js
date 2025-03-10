// OTPForm Component
import React, { useState } from "react";

const OTPForm = ({ onVerify, email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6 || isNaN(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onVerify();
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md mx-auto text-center"
    >
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <div className="mb-4 text-left">
        <label
          htmlFor="otp"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          OTP
        </label>
        <input
          id="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-md w-full transition"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OTPForm;
