"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/auth/Header";
import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";
import LogoutMessage from "@/components/auth/LogoutMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    console.log("Query message:", message);

    if (message === "logout-success") {
      toast.success("You have been logged out successfully.");
      router.replace("/login"); // Clean up URL
    }
  }, [searchParams, router]);

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setStep(2);
  };

  const handleVerify = () => {
    console.log("User verified, redirecting to Home...");
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 bg-gray-900 text-white">
      <ToastContainer />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-gray-800 py-8 px-6 rounded-2xl shadow-lg text-center">
        <Header />
        {logoutMessage && <LogoutMessage message={logoutMessage} />}
        {step === 1 ? (
          <LoginForm onNext={handleNext} />
        ) : (
          <OTPForm onVerify={handleVerify} email={email} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
