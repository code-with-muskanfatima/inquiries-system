"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ChevronsUpDown,
  Bed,
  Check,
  Car,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";

type Location = {
  id: number;
  name: string;
  inquiries: number | string;
  reservations: number;
  overall: number;
  status: "Active" | "Inactive";
  minCapacity: number;
  maxCapacity: number;
  address: string;
  primaryPhone: string;
  secondaryPhone?: string;
  attributes: ("image" | "file" | "video")[];
  eventTypes: string[];
  imageUrl?: string | null;
  mapLink?: string | null;
};

function AttributeIcons({ attrs }: { attrs: Location["attributes"] }) {
  return (
    <div className="flex gap-2 items-center">
      {attrs.includes("image") && (
        <Bed className="h-6 w-6 text-black bg-gray-200 p-1 rounded-xs" />
      )}
      {attrs.includes("file") && (
        <Check className="h-6 w-6 text-black bg-gray-200 p-1 rounded-xs" />
      )}
      {attrs.includes("video") && (
        <>
          <Car className="h-6 w-6 text-black bg-gray-200 p-1 rounded-xs" />
          <Mail className="h-6 w-6 text-black bg-gray-200 p-1 rounded-xs" />
        </>
      )}
    </div>
  );
}

type SortConfig = { key: keyof Location; direction: "asc" | "desc" } | null;

export default function LocationManagementPage() {
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const sampleLocations: Location[] = Array.from({ length: 12 }).map((_, i) => {
      const id = i + 1;
      return {
        id,
        name: [
          "Mr. Ali",
          "Prof. Umair",
          "Muskan Fatima",
          "Dr. Ayesha",
          "Hajra Qadir",
          "Neha Rana",
          "Prof. Iqra",
          "Zoha Rehman",
          "Prof. Amir",
          "Sir. Abdullah",
          "Sana Ahmed",
          "Ayesha Khan",
        ][i],
        inquiries: Math.floor(Math.random() * 10),
        reservations: Math.floor(Math.random() * 3),
        overall: Math.floor(Math.random() * 6) + 1,
        status: "Active",
        minCapacity: Math.floor(Math.random() * 1000),
        maxCapacity: Math.floor(Math.random() * 5000) + 500,
        address: [
          "14988 alta ways suite 332 crittview, mo 12341",
          "574 aufduhr garden, nc 22964",
          "42739 shirley stream apt 735 west alexane, ar 12005",
          "2552 riedor island, ct 06815",
          "77308 genevieve shore apt 750 gentychester, ut 13639",
          "40351 mathew place lake amir, mi 32442",
          "18691 nadie inlet apt 578 north bethel, tx 68903",
          "2936 jessica locks rathshire, tn 90997",
          "1088 block lodge suite 472 south giselle, ks 01574",
          "877 beahan square suite 120 south hallie, oh 05890",
          "14 main st, lahore, pk",
          "55 gulberg, lahore, pk",
        ][i],
        primaryPhone: ["+1 203 493 0101", "+1 (747) 697 8191", "+1 989 851 919"][i % 3],
        secondaryPhone: ["(314) 997 2210", "+1 455 610 1739", "520.760.1342"][i % 3],
        attributes: i % 3 === 0 ? ["image", "file", "video"] : i % 3 === 1 ? ["image", "file"] : ["image"],
        eventTypes: i % 4 === 0
          ? ["Wedding", "Birthday", "Party", "Meeting", "Concert"]
          : i % 4 === 1
          ? ["Wedding", "Birthday"]
          : i % 4 === 2
          ? ["Wedding", "Party", "Corporate"]
          : ["Birthday", "Party"],
        imageUrl: null,
        mapLink: null,
      };
    });
    setLocations(sampleLocations);
  }, []);

  const handleSort = (key: keyof Location) => {
    if (sortConfig?.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const sortedLocations = React.useMemo(() => {
   const filtered = locations.filter((loc) => {
      if (statusFilter !== "All" && loc.status !== statusFilter) return false;
      if (!query) return true;
      return loc.name.toLowerCase().includes(query.toLowerCase());
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }
        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return filtered;
  }, [locations, statusFilter, query, sortConfig]);

  const sortableColumns: { label: string; key: keyof Location }[] = [
    { label: "ID", key: "id" },
    { label: "Image", key: "imageUrl" },
    { label: "Map Link", key: "mapLink" },
    { label: "Location Name", key: "name" },
    { label: "Inquiries", key: "inquiries" },
    { label: "Reservations", key: "reservations" },
    { label: "Overall", key: "overall" },
    { label: "Status", key: "status" },
    { label: "Min Capacity", key: "minCapacity" },
    { label: "Max Capacity", key: "maxCapacity" },
    { label: "Address", key: "address" },
    { label: "Primary Phone", key: "primaryPhone" },
    { label: "Secondary Phone", key: "secondaryPhone" },
    { label: "Attributes", key: "attributes" },
    { label: "Event Types", key: "eventTypes" },
  ];

  return (
    <AppLayout>
      <div className="relative">
        {/* Page content */}
        <div className={`${showAddForm ? "pointer-events-none opacity-0" : ""} transition-opacity duration-200`}>
          <h1 className="text-xl font-bold mb-4">Location Management</h1>

          {/* Filters + Actions */}
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter by location name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="max-w-xs"
              />
              <Select
  onValueChange={(v: "All" | "Active" | "Inactive") => setStatusFilter(v)}
  defaultValue="All"
>

                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Button size="sm" variant="default" className="bg-gray-100 hover:bg-gray-200 text-sm text-black border-2 border-gray-200">
                Views
              </Button>
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                + Add Venue
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <div className="max-h-[800px] max-w-[890px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    {sortableColumns.map((col) => (
                      <TableHead
                        key={col.key}
                        className="sticky top-0 z-10 bg-white cursor-pointer"
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center gap-1">
                          {col.label} <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="sticky top-0 z-10 bg-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLocations.map((loc) => (
                    <TableRow key={loc.id}>
                      <TableCell>
                        <Link href="/" className="text-blue-700 underline">{loc.id}</Link>
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          {loc.imageUrl ? <AvatarImage src={loc.imageUrl} alt={loc.name} /> :
                            <AvatarFallback className="bg-gray-200 text-gray-500">
                              <div className="h-6 w-6 rounded-sm bg-gray-200" />
                            </AvatarFallback>
                          }
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {loc.mapLink ? <a href={loc.mapLink} className="underline text-blue-600">map</a> :
                          <span className="text-xs text-gray-400">no link</span>}
                      </TableCell>
                      <TableCell className="font-medium">{loc.name}</TableCell>
                      <TableCell><a href="#" className="text-blue-600 underline">{loc.inquiries}</a></TableCell>
                      <TableCell>{loc.reservations}</TableCell>
                      <TableCell>{loc.overall}</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">{loc.status}</Badge></TableCell>
                      <TableCell>{loc.minCapacity}</TableCell>
                      <TableCell>{loc.maxCapacity}</TableCell>
                      <TableCell className="max-w-xs truncate" title={loc.address}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{loc.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{loc.primaryPhone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{loc.secondaryPhone}</TableCell>
                      <TableCell><AttributeIcons attrs={loc.attributes} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {loc.eventTypes.slice(0, 2).map((t, idx) => (
                            <Badge key={idx} className="mr-1 bg-gray-200 text-gray-800 hover:bg-gray-300">{t}</Badge>
                          ))}
                          {loc.eventTypes.length > 2 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center bg-gray-200 hover:bg-gray-300 gap-1">
                                  See All
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                {loc.eventTypes.slice(2).map((t, idx) => (
                                  <DropdownMenuItem key={idx}>{t}</DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="actions">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => alert(`Edit ${loc.name}`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`Delete ${loc.name}`)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
              <div className="text-sm text-gray-600">
                Showing {sortedLocations.length} out of {locations.length}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">Previous</Button>
                <div className="px-3 py-1 rounded-md border text-sm">1</div>
                <Button size="sm" variant="ghost">Next</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Venue Modal */}
        {showAddForm && (
          <div className="absolute inset-0 justify-center z-50">
            <div className="bg-gray-50 rounded-lg border p-6 w-full  max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add Venue</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Location Name" />
                <Input placeholder="Inquiries" type="number" />
                <Input placeholder="Reservations" type="number" />
                <Input placeholder="Overall Rating" type="number" />
                <Select defaultValue="Active">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Min Capacity" type="number" />
                <Input placeholder="Max Capacity" type="number" />
                <Input placeholder="Address" />
                <Input placeholder="Primary Phone" />
                <Input placeholder="Secondary Phone" />
                <Select defaultValue="image">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Attributes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Event Types (comma separated)" />
                <Input placeholder="Image URL" />
                <Input placeholder="Map Link" />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button size="sm" variant="default" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setShowAddForm(false)}>Submit</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
