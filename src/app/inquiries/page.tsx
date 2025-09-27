"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  ScrollText,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppLayout from "@/components/layout/AppLayout";

// 🔹 Dummy Data
const dummyData = [
  {
    id: "01",
    contact: "Ali Raza",
    venue: "Grand Hall",
    email: "ali.raza@example.com",
    eventDate: "2025-10-05",
    deadline: "2025-09-01",
    type: "Wedding",
    guests: 250,
    status: "New",
  },
  {
    id: "02",
    contact: "Sara Khan",
    venue: "Sunset Gardens",
    email: "sara.khan@example.com",
    eventDate: "2025-11-12",
    deadline: "2025-09-20",
    type: "Birthday",
    guests: 120,
    status: "In Progress",
  },
  {
    id: "03",
    contact: "Usman Ali",
    venue: "Pearl Marquee",
    email: "usman.ali@example.com",
    eventDate: "2025-09-30",
    deadline: "2025-09-05",
    type: "Conference",
    guests: 500,
    status: "Completed",
  },
  {
    id: "04",
    contact: "Fatima Noor",
    venue: "Rose Banquet",
    email: "fatima.noor@example.com",
    eventDate: "2025-12-01",
    deadline: "2025-10-10",
    type: "Wedding",
    guests: 300,
    status: "Pending",
  },
  {
    id: "05",
    contact: "Ahmed Khan",
    venue: "City Club",
    email: "ahmed.khan@example.com",
    eventDate: "2025-11-05",
    deadline: "2025-09-15",
    type: "Party",
    guests: 80,
    status: "New",
  },
];

// 🔹 Date difference function
function daysAgo(dateString: string) {
  const today = new Date();
  const target = new Date(dateString);
  const diff = Math.floor(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff > 0) return `${diff} days ago`;
  return `in ${Math.abs(diff)} days`;
}

export default function InquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  // 🔹 Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  // 🔹 Sorting handler
  function handleSort(key: string) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: "", direction: null }; // reset
        return { key, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  // 🔹 Apply Filters
  const filteredData = dummyData.filter((d) => {
    const matchesSearch =
      d.contact.toLowerCase().includes(search.toLowerCase()) ||
      d.venue.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status ? d.status === status : true;
    const matchesType = eventType ? d.type === eventType : true;
    const matchesDate = date ? d.eventDate === date : true;

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // 🔹 Apply Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    const valueA = a[sortConfig.key as keyof typeof a];
    const valueB = b[sortConfig.key as keyof typeof b];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc"
        ? valueA - valueB
        : valueB - valueA;
    }
    return 0;
  });

  return (
    <AppLayout>
      <div className="p-4">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
    <h1 className="text-lg sm:text-xl font-semibold">Inquiry Oversight</h1>
  </div>

  {/* 🔹 Top Bar */}
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
    {/* Left: Search + Filters */}
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full lg:w-auto">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
        <Input
          placeholder="Filter by name or venue"
          className="pl-8 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>

      <select
        className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Wedding">Wedding</option>
        <option value="Birthday">Birthday</option>
        <option value="Conference">Conference</option>
        <option value="Party">Party</option>
      </select>

      <Input
        type="date"
        className="w-full sm:w-48"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    {/* Right: Buttons */}
    <div className="flex items-center gap-2 w-full lg:w-auto">
      <Button variant="outline" className="flex-1 lg:flex-none">Views</Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center bg-amber-600 hover:bg-amber-700 gap-1 flex-1 lg:flex-none">
            <Plus className="w-4 h-4" /> Add Inquiry
          </Button>
        </DialogTrigger>

        <DialogOverlay className="fixed inset-0 bg-white" />
        <DialogContent className="bg-white rounded-lg shadow-lg max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Add New Inquiry</DialogTitle>
          </DialogHeader>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Contact Person" />
            <Input placeholder="Venue" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Event Date" type="date" />
            <Input placeholder="Deadline" type="date" />
            <Input placeholder="Event Type" />
            <Input placeholder="Guests" type="number" />
            <Input placeholder="Status" />
          </form>

          <div className="flex justify-end mt-4">
            <Button type="submit">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>

  {/* Scrollable Table */}
  <div className="border rounded-md">
    <div className="max-w-[900px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>

            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("contact")}
            >
              Contact Person
              <ChevronsUpDown size={16} className="text-gray-500 ml-28 -mt-4" />
            </TableHead>

            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("venue")}
            >
              Venue
              <ChevronsUpDown size={16} className="text-gray-500 ml-12 -mt-4" />
            </TableHead>

            <TableHead
              className="cursor-pointer select-none"
              onClick={() => handleSort("email")}
            >
              Email
              <ChevronsUpDown size={16} className="text-gray-500 ml-12 -mt-4" />
            </TableHead>

            <TableHead>Event Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((inq) => (
            <TableRow key={inq.id}>
              <TableCell className="text-blue-600 underline cursor-pointer">
                {inq.id}
              </TableCell>
              <TableCell>{inq.contact}</TableCell>
              <TableCell>{inq.venue}</TableCell>
              <TableCell>{inq.email}</TableCell>
              <TableCell>{daysAgo(inq.eventDate)}</TableCell>
              <TableCell>{daysAgo(inq.deadline)}</TableCell>
              <TableCell>{inq.type}</TableCell>
              <TableCell>{inq.guests}</TableCell>
              <TableCell>
                <ScrollText className="w-4 h-4 cursor-pointer text-gray-600" />
              </TableCell>
              <TableCell>
                <Badge className="px-2 py-1 rounded-full text-xs" variant="outline">
                  {inq.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

  {/* Pagination */}
  <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-3">
    <p className="text-sm text-gray-500">
      Showing {sortedData.length} out of {dummyData.length}
    </p>
    <div className="flex items-center space-x-1">
      <Button variant="outline" size="sm">Previous</Button>
      {[1, 2].map((num) => (
        <Button
          key={num}
          variant={num === 1 ? "default" : "outline"}
          size="sm"
        >
          {num}
        </Button>
      ))}
      <Button variant="outline" size="sm">Next</Button>
    </div>
  </div>
</div>

    </AppLayout>
  );
}
