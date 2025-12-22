import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleImageUploader from "@/components/SingleImageUploader";

export const ActivityList = ({ dayIndex }: { dayIndex: number }) => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `itinerary.${dayIndex}.activities`,
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="md:flex gap-3 items-start p-4 border rounded-md relative group"
        >
          <div className="flex-1 md:grid grid-cols-12 gap-3">
            {/* 1. Time & Type */}
            <div className="col-span-3 space-y-2">
              <Input
                {...register(`itinerary.${dayIndex}.activities.${index}.time`)}
                placeholder="10:00 AM"
              />

              <div>
                <Controller
                  control={control}
                  name={`itinerary.${dayIndex}.activities.${index}.type`}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select a type"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visit">Visit 📷</SelectItem>
                        <SelectItem value="food">Food 🍽️</SelectItem>
                        <SelectItem value="travel">Travel 🚌</SelectItem>
                        <SelectItem value="stay">Stay 🏨</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* 2. Title & Desc */}
            <div className="col-span-9 space-y-2 mt-2 md:mt-0">
              <Input
                {...register(`itinerary.${dayIndex}.activities.${index}.title`)}
                placeholder="চট্টগ্রাম স্টেশনে নামা"
                className="font-medium"
              />
              <Input
                {...register(
                  `itinerary.${dayIndex}.activities.${index}.location`
                )}
                placeholder="লোকেশনঃ চট্টগ্রাম"
                className="font-medium"
              />

              {/* File Upload would go here */}
              <Controller
                control={control}
                name={`itinerary.${dayIndex}.activities.${index}.image`}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <SingleImageUploader
                    value={value} // Pass current value (File or URL)
                    onChange={onChange} // Pass the function to update form
                    error={error?.message} // Pass error message
                  />
                )}
              />
            </div>
          </div>

          {/* Remove Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="text-slate-400 hover:text-red-500"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="w-full border-dashed border-2 border-slate-200"
        onClick={() => append({ title: "", type: "visit" })}
      >
        <Plus className="w-4 h-4 mr-2" /> Add Activity
      </Button>
    </div>
  );
};