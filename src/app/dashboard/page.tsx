"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TriangleAlert,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";

const data = [
  { month: "Jan", enquiries: 30 },
  { month: "Feb", enquiries: 45 },
  { month: "Mar", enquiries: 28 },
  { month: "Apr", enquiries: 60 },
  { month: "May", enquiries: 50 },
  { month: "Jun", enquiries: 76 },
  { month: "Jul", enquiries: 40 },
  { month: "Aug", enquiries: 66 },
  { month: "Sep", enquiries: 55 },
  { month: "Oct", enquiries: 70 },
  { month: "Nov", enquiries: 48 },
  { month: "Dec", enquiries: 80 },
];

const urgentDeadlines = [
  {
    client: "Abdullah",
    type: "Wedding",
    location: "Zoe Rippin I",
    deadline: "In 4 Days",
    status: "PENDING",
  },
];

const latestInquiries = [
  { client: "Kinza", type: "party", location: "Zoe Rippin I", deadline: "In 5 Days", status: "PENDING" },
  { client: "Abdullah", type: "Wedding", location: "White Castle", deadline: "In 4 Days", status: "PENDING" },
  { client: "Hajra", type: "Meeting", location: "Cheezious", deadline: "In 4 Days", status: "PENDING" },
  { client: "Neha", type: "Engagment", location: "Grand Season", deadline: "13 Days Ago", status: "PENDING" },
  { client: "Zoha", type: "Birthday", location: "Pizza online", deadline: "13 Days Ago", status: "PENDING" },
];

export default function DashboardPage() {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  return (
    <AppLayout>
      {/* Main Header */}
     <header className="flex sm:flex-row gap-6 mx-4 justify-between px-4 sm:px-6 py-4 border-b bg-white">
  {/* Dashboard Title */}
  <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>

  {/* Add User Button */}
  <Button
    onClick={() => setIsUserFormOpen(true)}
    className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1 ml-auto sm:ml-0"
  >
    <Plus className="h-4 w-4" />
    <span>Add New User</span>
  </Button>
</header>


      {/* Right Drawer - Add User Form */}
      {isUserFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[400px] bg-white h-full shadow-lg flex flex-col animate-slideIn">
            {/* Drawer Header */}
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h3 className="text-lg font-semibold">Add User</h3>
              <X
                className="cursor-pointer"
                onClick={() => setIsUserFormOpen(false)}
              />
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input className="w-full border p-2 rounded" placeholder="Enter name" />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input className="w-full border p-2 rounded" type="email" placeholder="user@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium">Role</label>
                <select className="w-full border p-2 rounded">
                  <option>Select role</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Active</label>
                <select className="w-full border p-2 rounded">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="w-full border p-2 rounded" placeholder="******" />
              </div>

              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input type="password" className="w-full border p-2 rounded" placeholder="******" />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t">
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => setIsUserFormOpen(false)}
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-t from-orange-50 to-white">
          <CardContent className="p-4">
            <p className="text-md pb-2 text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">4</h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-orange-50 to-white">
          <CardContent className="p-4">
            <p className="text-md pb-2 text-gray-500">Total Inquiries</p>
            <h3 className="text-2xl font-bold">99</h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-orange-50 to-white">
          <CardContent className="p-4">
            <p className="text-md pb-2 text-gray-500">Total Locations</p>
            <h3 className="text-2xl font-bold">50</h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-t from-orange-50 to-white">
          <CardContent className="p-4">
            <p className="text-md pb-2 text-gray-500">Total Reservations</p>
            <h3 className="text-2xl font-bold">3</h3>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Enquiries Over Months</h3>
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                    formatter={(value: number) => [`${value}`, "enquiries"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="enquiries"
                    stroke="black"
                    strokeWidth={3}
                    dot={{ fill: "white", stroke: "black", r: 5 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines + Latest Inquiries */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Deadlines */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
              <TriangleAlert size={28} className="text-red-500" /> Urgent Deadlines
            </h3>
            <div className="overflow-auto max-h-64">
              <table className="min-w-[700px] border-collapse text-sm">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="border-b text-gray-600">
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Event Type</th>
                    <th className="text-left p-2">Location</th>
                    <th className="text-left p-2">Deadline</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {urgentDeadlines.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 font-semibold">{row.client}</td>
                      <td className="p-2">{row.type}</td>
                      <td className="p-2">{row.location}</td>
                      <td className="p-2">{row.deadline}</td>
                      <td className="p-2 text-gray-600">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Latest Inquiries */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} /> Latest Inquiries
            </h3>
            <div className="overflow-auto max-h-64">
              <table className="min-w-[700px] border-collapse text-sm">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="border-b text-gray-600">
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Event Type</th>
                    <th className="text-left p-2">Location</th>
                    <th className="text-left p-2">Deadline</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestInquiries.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 font-semibold">{row.client}</td>
                      <td className="p-2">{row.type}</td>
                      <td className="p-2">{row.location}</td>
                      <td className="p-2">{row.deadline}</td>
                      <td className="p-2 text-gray-600">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Locations */}
      <Card className="rounded-lg p-6 shadow-sm border border-gray-200 mt-6 mx-6">
        <h2 className="text-xl font-bold mb-4">Top Performing Locations</h2>
        <p className="text-gray-500 mb-6">Sorted by total reservations</p>

        <div className="space-y-6">
          {[
            { name: "Downtown Plaza", reservations: 128, conversion: 68, rank: 1 },
            { name: "Sunset Heights", reservations: 98, conversion: 59, rank: 2 },
            { name: "Greenview Gardens", reservations: 75, conversion: 52, rank: 3 },
            { name: "Ocean Breeze Apartments", reservations: 63, conversion: 48, rank: 4 },
          ].map(({ name, reservations, conversion, rank }) => (
            <div
              key={rank}
              className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-none"
            >
              <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-400 text-sm">
                  {`${reservations} reservations • ${conversion}% conv. rate`}
                </p>
              </div>
              <div className="bg-gray-100 text-gray-600 text-xs font-semibold rounded-full px-3 py-1 select-none">
                #{rank}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppLayout>
  );
}
