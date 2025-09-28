"use client";

import { NavList } from "../ui/NavList";

type SidebarProps = {
  isSidebarOpen: boolean;
};

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-68 border-r bg-gray-100 z-50 flex flex-col justify-between
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div>
        <div className="px-4 py-4 text-md font-semibold">
          Inquiry Management System
        </div>
        <NavList />
      </div>

      <div className="px-6 py-4">
        <h2 className="font-bold text-sm">admin</h2>
        <span className="text-gray-400 text-xs">admin@system.com</span>
      </div>
    </aside>
  );
}
