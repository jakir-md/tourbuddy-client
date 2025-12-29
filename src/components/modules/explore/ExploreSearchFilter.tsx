"use client";

import SelectFilter from "@/components/shared/SelectFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { CalendarIcon, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getNewDate } from "@/lib/getNewDate";
import { getAllStartPoints } from "@/services/user/trip";

export default function ExploreSearchFilters() {
  const [startDate, setStartDate] = useState<Date>();
  const [startOpen, setStartOpen] = useState(false);
  const [startPoints, setStartPoints] = useState<
    { label: string; value: string }[]
  >([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("searchTerm") || ""
      );
    }
    return "";
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await getAllStartPoints();
      console.log("all startPoints", result);
      if (result.success) {
        setStartPoints([...result.data]);
      }
    };
    loadData();
  }, []);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      router.push(`/explore?${params.toString()}`);
    },
    [router]
  );

  console.log("start Date", startDate);

  useEffect(() => {
    if (startDate !== undefined) {
      updateFilters("startDate", getNewDate(startDate, 0));
    }
  }, [startDate]);

  useEffect(() => {
    const urlSearchTerm =
      new URLSearchParams(window.location.search).get("searchTerm") || "";
    if (debouncedSearch !== urlSearchTerm) {
      updateFilters("searchTerm", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleClearFilters = () => {
    setSearchTerm("");
    router.push("/explore");
  };

  const hasActiveFilters =
    searchParams.get("searchTerm") || searchParams.get("startDate");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <SelectFilter
          options={[
            { label: "ADVENTURE", value: "ADVENTURE" },
            { label: "FOODIE", value: "FOODIE" },
            { label: "BEACH", value: "BEACH" },
            { label: "CULTURAL", value: "CULTURAL" },
            { label: "CAMPAIGN", value: "CAMPAIGN" },
            { label: "WORK", value: "WORK" },
            { label: "PHOTO", value: "PHOTO" },
            { label: "ROAD_TRIP", value: "ROAD_TRIP" },
          ]}
          paramName="category"
          placeholder="Select a Type"
        />

        <SelectFilter
          placeholder="Select a StartPoint"
          paramName="startPoint"
          options={startPoints}
        />
        <div className="flex flex-col gap-2">
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
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setStartOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
