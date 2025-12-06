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

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { createNewTrip } from "@/services/user/trip";

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
    budget: 0,
    type: "",
    description: "",
    activities: "",
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

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxFiles,
    maxSize,
    multiple: true,
  });

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
              <div className="flex flex-col gap-2">
                {/* Drop area */}
                <div
                  className="relative flex min-h-52 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
                  data-dragging={isDragging || undefined}
                  data-files={files.length > 0 || undefined}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    {...getInputProps()}
                    aria-label="Upload image file"
                    className="sr-only"
                  />
                  {files.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate font-medium text-sm">
                          Uploaded Files ({files.length})
                        </h3>
                        <Button
                          disabled={files.length >= maxFiles}
                          onClick={openFileDialog}
                          size="sm"
                          variant="outline"
                        >
                          <UploadIcon
                            aria-hidden="true"
                            className="-ms-0.5 size-3.5 opacity-60"
                          />
                          Add more
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {files.map((file) => (
                          <div
                            className="relative aspect-square rounded-md bg-accent"
                            key={file.id}
                          >
                            <img
                              alt={file.file.name}
                              className="size-full rounded-[inherit] object-cover"
                              src={file.preview}
                            />
                            <Button
                              aria-label="Remove image"
                              className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                              onClick={() => removeFile(file.id)}
                              size="icon"
                            >
                              <XIcon className="size-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                      <div
                        aria-hidden="true"
                        className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                      >
                        <ImageIcon className="size-4 opacity-60" />
                      </div>
                      <p className="mb-1.5 font-medium text-sm">
                        Drop your images here
                      </p>
                      <p className="text-muted-foreground text-xs">
                        SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                      </p>
                      <Button
                        className="mt-4"
                        onClick={openFileDialog}
                        variant="outline"
                      >
                        <UploadIcon
                          aria-hidden="true"
                          className="-ms-1 opacity-60"
                        />
                        Select images
                      </Button>
                    </div>
                  )}
                </div>

                {errors.length > 0 && (
                  <div
                    className="flex items-center gap-1 text-destructive text-xs"
                    role="alert"
                  >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                  </div>
                )}
              </div>
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
            <div className="space-y-1.5 w-full">
              <Label>Travel Style</Label>
              <Select
                onValueChange={(val) => handleChange("type", val)}
                value={formData.type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="LUXURY">Luxury</SelectItem>
                  <SelectItem value="BUSINESS">Business</SelectItem>
                  <SelectItem value="BACKPACKING">Backpacking</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
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
            <div className="space-y-1.5">
              <Label>Trip Activities</Label>
              <Textarea
                placeholder="eg. Hiking, Skiing, Trekking"
                className="h-12"
                value={formData.activities}
                onChange={(e) => handleChange("activities", e.target.value)}
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
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(formData));
    files.map((file) => {
      newFormData.append("photos", file.file as unknown as File);
    });
    const result = await createNewTrip(newFormData);
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
