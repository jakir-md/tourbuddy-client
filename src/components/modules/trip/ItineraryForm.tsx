"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ActivityList } from "./ActivityList";
import { getNewDate } from "@/lib/getNewDate";

export default function ItineraryForm() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Itinerary Plan</h3>
        <Button
          type="button"
          onClick={() => {
            const currDay = fields.length;
            append({
              day: currDay + 1,
              title: "",
              date: getNewDate(startDate, currDay),
              activities: [],
            });
          }}
          disabled={
            startDate === "" ||
            endDate === "" ||
            getNewDate(startDate, fields.length-1) === getNewDate(endDate, 0)
          }
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Day {fields.length + 1}
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {fields.map((field, index) => (
          <AccordionItem
            key={field.id}
            value={field.id}
            className="border rounded-md px-4 bg-slate-50"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex gap-4 items-center w-full pr-4">
                <span className="font-bold whitespace-nowrap">
                  Day {index + 1}
                </span>
                <div onClick={(e) => e.stopPropagation()} className="flex-1">
                  <Input
                    {...register(`itinerary.${index}.title`)}
                    placeholder="বাসে উঠা থেকে কক্সবাজারে গিয়ে হোটেলে উঠা"
                    className="bg-white"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-4 mb-2 bg-white rounded-b-lg border">
              <ActivityList dayIndex={index} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
