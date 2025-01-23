"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use this instead of "next/router" for app router
import Header from "@/components/auth/Header";
import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";
import LogoutMessage from "@/components/auth/LogoutMessage";

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only in the client environment
    if (typeof window !== "undefined" && router.query?.logout === "success") {
      setLogoutMessage("You have been logged out successfully.");
      router.replace("/", { shallow: true }); // Remove query param from URL
    }
  }, [router]);

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setStep(2);
  };

  const handleVerify = () => {
    console.log("User verified, redirecting to Home...");
    router.push("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Header />
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          paddingTop: logoutMessage ? "30px" : "0",
        }}
      >
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
