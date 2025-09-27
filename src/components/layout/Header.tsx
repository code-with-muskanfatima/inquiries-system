"use client";

import { PanelLeft } from "lucide-react";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  return (
    <div className="flex items-center border-b border-gray-200 gap-3 px-8 py-3 bg-white">
      
      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <PanelLeft
          size={20}
          className="cursor-pointer text-gray-600"
        />
      </button>

      <h5 className="text-md border-l-2 border-gray-200 pl-2 font-semibold">
        Dashboard
      </h5>
      
    </div>
  );
}
