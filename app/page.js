"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LogoutMessage from "@/components/auth/LogoutMessage";

const Home = () => {
  const [logoutMessage, setLogoutMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();  

  useEffect(() => {
    if (searchParams.get("logout") === "success") {
      setLogoutMessage("You have been logged out successfully.");
      router.replace("/", { shallow: true }); 
    }
  }, [searchParams, router]);

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        {logoutMessage && (
          <LogoutMessage message={logoutMessage} />
        )}
        <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>
          Main page
        </div>
      </div>
    </div>
  );
}

export default Home;