import Sidebar from "@/components/ui/Navbar/Sidebar";
import Topbar from "@/components/ui/Navbar/Topbar";
import React from "react";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar />
      <Sidebar />
      {children}
    </div>
  );
}
