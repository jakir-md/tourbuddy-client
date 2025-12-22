"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker() {
  const { control, setValue, watch } = useFormContext();
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // State to manage popover open/close
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  // Helper to ensure we don't accidentally disable "Today" due to time differences
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex gap-2 justify-between">
      <div className="flex flex-col gap-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Popover open={startOpen} onOpenChange={setStartOpen}>
          <PopoverTrigger asChild>
            <Button
              id="startDate"
              variant={"outline"}
              className={cn(
                "w-[175px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className=" h-4 w-4" />
              {startDate ? (
                format(startDate, "PPP")
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Controller
              control={control}
              name="startDate" // <--- Make sure this matches your schema (fix the 'starDate' typo!)
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value} // 1. Read value from Form
                  onSelect={(date) => {
                    field.onChange(date); // 2. Send value to Form

                    setStartOpen(false); // 3. Keep your UI logic

                    // 4. Handle your validation logic using form methods
                    if (endDate && date && date > endDate) {
                      setValue("endDate", null); // Clear valid end date in form
                    }
                  }}
                  disabled={(date) => {
                    // 1. Disable Past: date < today
                    if (date < today) return true;
                    // 2. Disable Future relative to EndDate: if endDate exists, date > endDate
                    if (endDate && date > endDate) return true;
                    return false;
                  }}
                />
              )}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="endDate">End Date</Label>
        <Popover open={endOpen} onOpenChange={setEndOpen}>
          <PopoverTrigger asChild>
            <Button
              id="endDate"
              variant={"outline"}
              className={cn(
                "w-[175px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Controller
              control={control}
              name="endDate" // <--- Make sure this matches your schema (fix the 'starDate' typo!)
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value} // 1. Read value from Form
                  onSelect={(date) => {
                    field.onChange(date); // 2. Send value to Form

                    setEndOpen(false); // 3. Keep your UI logic

                    // 4. Handle your validation logic using form methods
                    if (endDate && date && date > endDate) {
                      setValue("endDate", null); // Clear valid end date in form
                    }
                  }}
                  disabled={(date) => {
                    // If start date is selected, disable everything before it.
                    // This implicitly handles "today" because startDate must be >= today.
                    if (startDate && date < startDate) return true;

                    // If NO start date selected, just disable past dates
                    if (!startDate && date < today) return true;

                    return false;
                  }}
                />
              )}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
