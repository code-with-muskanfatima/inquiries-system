"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Car, Check, Calendar, Bed, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";

//  Attribute type
type Attribute = {
  id: number;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
};

export default function AttributesPage() {
  const [attributes] = useState<Attribute[]>([
    { id: 1, name: "Free Parking", icon: Car },
    { id: 2, name: "Big Terrace", icon: Bed },
    { id: 3, name: "Garden", icon: Calendar },
    { id: 4, name: "Air Conditioning", icon: Check },
    { id: 5, name: "Sound System", icon: Car },
    { id: 6, name: "Stage/Platform", icon: Mail },
  ]);

  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("Car");
  const [open, setOpen] = useState(false); // ✅ Sheet control

  // sirf form band karni hai, attribute add nahi karna
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false); 
    setNewName("");
    setNewIcon("Car");
  };

  const iconOptions: Record<string, React.ComponentType<{ size?: number }>> = {
    Car,
    Bed,
    Calendar,
    Check,
    Mail,
  };

  return (
    <AppLayout>
      <div className="mx-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Attributes</h2>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-md">
                + Add Attributes
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="text-2xl">Add Attribute</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="mt-4 mx-4 space-y-4">
                <Input
                  placeholder="Enter attribute name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <Select value={newIcon} onValueChange={setNewIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(iconOptions).map(([key, Icon]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon size={18} />
                          <span>{key}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <SheetFooter>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Save
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* List */}
        <Card className="p-1 divide-y mt-4">
          {attributes.map((attr) => {
            const Icon = attr.icon;
            return (
              <div
                key={attr.id}
                className="flex justify-between items-center py-1 px-2"
              >
                <div className="flex items-center gap-2 text-gray-800">
                  <Icon size={18} />
                  <span>{attr.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </AppLayout>
  );
}
