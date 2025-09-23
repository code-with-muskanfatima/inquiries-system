"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  MapPin,
  Tags,
  Calendar,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { usePathname } from "next/navigation";

export function NavList() {
  const pathname = usePathname(); // 👈 current route nikalne ke liye

  return (
    <div className="flex flex-col gap-1 mt-4 mx-4">
      <NavItem
        href="/dashboard"
        label="Dashboard"
        icon={<LayoutDashboard className="h-4 w-4" />}
        className={pathname === "/dashboard" ? "bg-gray-200 font-semibold" : ""}
      />
      <NavItem
        href="/inquiries"
        label="Inquiries"
        icon={<FileText className="h-4 w-4" />}
      />
      <NavItem
        href="/users"
        label="Users"
        icon={<Users className="h-4 w-4" />}
      />
      <NavItem
        href="/locations"
        label="Locations"
        icon={<MapPin className="h-4 w-4" />}
      />
      <NavItem
        href="/attributes"
        label="Attributes"
        icon={<Tags className="h-4 w-4" />}
      />
      <NavItem
        href="/event-types"
        label="Event Types"
        icon={<Calendar className="h-4 w-4" />}
      />
      <NavItem
        href="/calendar"
        label="Calendar"
        icon={<Calendar className="h-4 w-4" />}
      />
    </div>
  );
}
