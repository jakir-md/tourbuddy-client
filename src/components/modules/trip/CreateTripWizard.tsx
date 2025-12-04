"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  MapPin,
  DollarSign,
  List,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Define the shape of an Itinerary Item
interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

// Steps Definition
const steps = [
  { id: 1, title: "Destination" },
  { id: 2, title: "Details" },
  { id: 3, title: "Itinerary" }, // The Complex Step
];

export default function CreateTripWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  // Main Form State
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    type: "",
    description: "",
    image: "",
    itinerary: [] as ItineraryItem[], // Array of objects
  });

  // Helper: Calculate days between dates
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day
  };

  // Effect: When dates change, auto-generate itinerary slots
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const days = calculateDays(formData.startDate, formData.endDate);

      // Preserve existing data if user comes back to this step, only add/remove needed days
      setFormData((prev) => {
        const currentItinerary = [...prev.itinerary];
        if (days > currentItinerary.length) {
          // Add missing days
          for (let i = currentItinerary.length + 1; i <= days; i++) {
            currentItinerary.push({ day: i, title: "", description: "" });
          }
        } else if (days < currentItinerary.length) {
          // Trim extra days
          currentItinerary.splice(days);
        }
        return { ...prev, itinerary: currentItinerary };
      });
    }
  }, [formData.startDate, formData.endDate]);

  // Handlers
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItineraryChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const progress = (currentStep / steps.length) * 100;

  // Render Logic
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid w-full items-center gap-1.5">
              <Label>Where are you going?</Label>
              <Input
                placeholder="e.g., Kyoto, Japan"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Cover Image URL</Label>
              <Input
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1.5">
              <Label>Estimated Budget ($)</Label>
              <Input
                type="number"
                placeholder="500"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Travel Style</Label>
              <Select
                onValueChange={(val) => handleChange("type", val)}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOLO">Solo Backpacking</SelectItem>
                  <SelectItem value="LUXURY">Luxury</SelectItem>
                  <SelectItem value="BUSINESS">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Trip Description</Label>
              <Textarea
                placeholder="Tell people what this trip is about..."
                className="h-24"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        // THE NEW PROFESSIONAL ITINERARY UI
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Day-by-Day Plan</Label>
              <span className="text-sm text-slate-500">
                {formData.itinerary.length} Days calculated
              </span>
            </div>

            {formData.itinerary.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed">
                <p className="text-slate-500">
                  Please select valid dates in Step 1 to generate the itinerary.
                </p>
                <Button variant="link" onClick={() => setCurrentStep(1)}>
                  Go to Dates
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-6">
                  {formData.itinerary.map((item, index) => (
                    <div
                      key={item.day}
                      className="relative pl-6 border-l-2 border-slate-200"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-white" />

                      <h4 className="font-bold text-sm text-primary mb-2">
                        Day {item.day}
                      </h4>

                      <div className="space-y-3">
                        <Input
                          placeholder={`Day ${item.day} Title (e.g., Arrival & Check-in)`}
                          value={item.title}
                          onChange={(e) =>
                            handleItineraryChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="font-medium"
                        />
                        <Textarea
                          placeholder="Describe the activities for this day..."
                          value={item.description}
                          onChange={(e) =>
                            handleItineraryChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="min-h-[80px] text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    console.log("Submitting Payload:", formData);
    // Call your API: await axios.post('/api/trips', formData)
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="border-slate-200 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Plan Your Trip</CardTitle>
            <span className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="py-6 min-h-[400px]">{renderStep()}</CardContent>

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
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
            >
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
