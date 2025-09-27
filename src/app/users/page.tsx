"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronsUpDown, MoreHorizontal, X } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
};

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const users: User[] = [
    { name: "admin", email: "admin@system.com", role: "admin", status: "ACTIVE" },
    { name: "Hajra", email: "hajra@gmail.com", role: "owner", status: "ACTIVE" },
    { name: "Muskan", email: "codewithmuskan@gmail.com", role: "sales", status: "ACTIVE" },
    { name: "neha", email: "neha@gmail.com", role: "sales", status: "ACTIVE" },
  ];

  // 🔍 Filtering
  let filteredUsers = users.filter((u) => {
    const matchName = u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchName && matchRole;
  });

  // 🔽 Sorting
  if (sortKey) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      const valA = a[sortKey].toString().toLowerCase();
      const valB = b[sortKey].toString().toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // 🔀 Sorting Handler
  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <AppLayout>
      <Card className="p-4 sm:p-6 relative">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">User Management</h2>
          </div>

          {/* Filters + Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Input
                placeholder="Search by name"
                className="w-full sm:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select onValueChange={(val) => setRoleFilter(val)} defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto">Views</Button>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
                onClick={() => setIsDrawerOpen(true)}
              >
                + Add user
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  {["name", "email", "role", "status"].map((col) => (
                    <th
                      key={col}
                      className="p-3 font-semibold cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort(col as keyof User)}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)}
                      <ChevronsUpDown className="inline-block h-4 w-4 ml-2 text-gray-500" />
                    </th>
                  ))}
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-green-500 text-white rounded">
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-28">
                          <DropdownMenuItem onClick={() => console.log("Edit user:", user.name)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => console.log("Delete user:", user.name)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs sm:text-sm text-gray-600 gap-3">
            <div className="flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>Showing {filteredUsers.length} out of {users.length}</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-black">&lt; Previous</button>
              <span>1</span>
              <button className="text-gray-500 hover:text-black">Next &gt;</button>
            </div>
          </div>
        </CardContent>

        {/* Drawer (Right Slide-over Form) */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="bg-white w-full sm:w-96 h-full shadow-lg p-6 relative animate-slideIn">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-lg sm:text-xl font-semibold mb-4">Add User</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsDrawerOpen(false); // just close drawer
                }}
                className="space-y-4"
              >
                <Input placeholder="Name" required />
                <Input placeholder="Email" type="email" required />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Save
                </Button>
              </form>
            </div>
          </div>
        )}
      </Card>
    </AppLayout>
  );
}
