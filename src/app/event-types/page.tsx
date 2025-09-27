"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function EventTypesPage() {
  const [eventTypes] = useState([
    { id: 1, name: "Wedding" },
    { id: 2, name: "Birthday" },
    { id: 3, name: "Party" },
    { id: 4, name: "Meeting" },
  ]);

  const [newEventType, setNewEventType] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddEventType = () => {
    // Kuch add nahi karna, sirf form close karna hai
    setNewEventType("");
    setOpen(false);
  };

  return (
    <AppLayout>
      <div className="mx-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Event Types</h2>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-md">
                + Add Event Type
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Add Event Type</SheetTitle>
              </SheetHeader>
              <div className="mt-4 mx-4 space-y-4">
                <Input
                  placeholder="Enter event type"
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value)}
                />
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                  onClick={handleAddEventType}
                >
                  Save Event
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* List */}
        <Card className="p-2 divide-y mt-4">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center py-2 px-2"
            >
              <span>{event.name}</span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
}
