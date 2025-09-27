"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Tags,
  Calendar,
  ListChecks,
} from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
};

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Inquiries", icon: ListChecks, href: "/inquiries" },
    { name: "Users", icon: Users, href: "/users" },
    { name: "Locations", icon: MapPin, href: "/locations" },
    { name: "Attributes", icon: Tags, href: "/attributes" },
    { name: "Event Types", icon: Calendar, href: "/event-types" },
    { name: "Calendar", icon: Calendar, href: "/calendar" },
    { name: "Practice Table collapsible", icon: LayoutDashboard, href: "/practice-table" },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r h-full flex flex-col transition-all",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 font-bold text-lg">Inquiry Management System</div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li
                key={item.name}
                className={cn(
                  "px-4 py-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100",
                  isActive && "bg-gray-100 font-medium text-black"
                )}
              >
                <Icon className="h-5 w-5" />
                {isSidebarOpen && item.name}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm border-t">
        <div className="font-semibold">admin</div>
        <div className="text-gray-500">admin@system.com</div>
      </div>
    </aside>
  );
}
