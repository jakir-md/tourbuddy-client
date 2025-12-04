"use client";

import React, { useState } from "react";
import {
  CalendarIcon,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Steps Definition
const steps = [
  { id: 1, title: "Destination", icon: MapPin },
  { id: 2, title: "Details", icon: DollarSign },
  { id: 3, title: "Itinerary", icon: ImageIcon },
];

export default function CreateTripWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    type: "",
    description: "",
    activities: "",
  });

  // Handle Input Change
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigation Logic
  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Progress Calculation
  const progress = (currentStep / steps.length) * 100;

  // Render Step Content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="destination">Where are you going?</Label>
              <Input
                id="destination"
                placeholder="e.g., Kyoto, Japan"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="start">Start Date</Label>
                <Input
                  id="start"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end">End Date</Label>
                <Input
                  id="end"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <Label htmlFor="budget">Estimated Budget (per person)</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  id="budget"
                  type="number"
                  className="pl-9"
                  placeholder="500"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Travel Style</Label>
              <Select
                onValueChange={(val) => handleChange("type", val)}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Backpacking</SelectItem>
                  <SelectItem value="luxury">Luxury / Relaxed</SelectItem>
                  <SelectItem value="business">Business / Workation</SelectItem>
                  <SelectItem value="adventure">High Adventure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <Label htmlFor="desc">Trip Description</Label>
              <Textarea
                id="desc"
                placeholder="Tell people what this trip is about..."
                className="h-24"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="photos">Cover Photo URL (Optional)</Label>
              <Input id="photos" placeholder="https://..." />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Card className="border-slate-200 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Create New Trip</CardTitle>
            <span className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="py-6 min-h-[300px]">{renderStep()}</CardContent>

        <CardFooter className="flex justify-between bg-slate-50 p-6 rounded-b-xl">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          {currentStep === steps.length ? (
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              Publish Trip <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next Step <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
