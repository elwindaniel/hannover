"use client";
import Sidebar from "@/components/sidebar";
import { getSessionStorage } from "@/utils/sessionStorageUtil";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let admin = getSessionStorage("admin-user");
    if (admin === "logged") {
      setLoggedIn(true);
    } else {
      router.push("/admin/login"); // Redirect to login page if not logged in
    }
  }, [router]);

  if (!loggedIn) {
    return null; // Return null or a loader while redirecting
  }

  return (
    <div>
      <Sidebar />
      <div style={{ padding: "20px", marginLeft: "250px" }}>
        {children}
      </div>
    </div>
  );
}
