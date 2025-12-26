import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFields() {
  const { register, control, watch } = useFormContext();
  const [startOpen, setStartOpen] = useState(false);
  const startDate = watch("startDate");
  return (
    <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl">
      <div className="bg-white rounded-xl p-4 md:p-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Input: Destination */}
        <div className="md:col-span-4 relative group">
          <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
            <MapPin className="w-5 h-5 text-slate-400 mr-3" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Where
              </label>
              <input
                {...register("destination")}
                type="text"
                placeholder="Search destinations"
                className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none p-0"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-slate-200 mx-auto" />

        <div className="md:col-span-3 relative group">
          <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
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
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);

                          setStartOpen(false);
                        }}
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Separator (Desktop) */}
        <div className="hidden md:block w-px h-10 bg-slate-200 mx-auto" />

        {/* Input: Type */}
        <div className="md:col-span-3 relative group">
          <Label htmlFor="category">Category</Label>
          <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
            <Controller
              control={control}
              name={`category`}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select a type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADVENTURE">Adventure 🧗</SelectItem>
                    <SelectItem value="FOODIE">Foodie 🍔</SelectItem>
                    <SelectItem value="BEACH">Beach 🏖️</SelectItem>
                    <SelectItem value="CULTURAL">Cultural 🏛️</SelectItem>
                    <SelectItem value="CAMPAIGN">Campaign 📣</SelectItem>
                    <SelectItem value="WORK">Work 💼</SelectItem>
                    <SelectItem value="PHOTO">Photo 📸</SelectItem>
                    <SelectItem value="ROAD_TRIP">Road Trip 🚗</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
