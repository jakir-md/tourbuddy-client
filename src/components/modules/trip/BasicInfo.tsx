import { Input } from "@/components/ui/input";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BasicInfo = () => {
  const { control, register } = useFormContext();
  return (
    <div className="space-y-6">
      <div className="grid w-full items-center gap-1.5">
        <Label>Trip Name?</Label>
        <Input
          {...register(`title`)}
          placeholder="eg. Savar to Cox's Bazar"
          className="font-medium"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Category?</Label>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Select a type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADVENTURE">Adventure 📷</SelectItem>
                <SelectItem value="FOODIE">Foodie 🍽️</SelectItem>
                <SelectItem value="BEACH">Beach 🚌</SelectItem>
                <SelectItem value="CULTURAL">Cultural 🏨</SelectItem>
                <SelectItem value="CAMPAIGN">Campaign</SelectItem>
                <SelectItem value="WORK">Work</SelectItem>
                <SelectItem value="PHOTO">Photo</SelectItem>
                <SelectItem value="ROAD_TRIP">Road Trip</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Start From?</Label>
        <Input
          {...register(`startPoint`)}
          placeholder="eg. Dhaka"
          className="font-medium"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Main Destination</Label>
        <Input
          {...register(`destination`)}
          placeholder="eg. Cox's Bazar. Must be in English"
          className="font-medium"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Description</Label>
        <Textarea
          {...register(`description`)}
          placeholder="Details about this stop..."
          rows={2}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Banner Photo</Label>
        <Controller
          control={control}
          name={`bannerImage`}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SingleImageUploader
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Estimated Budget</Label>
        <Input
          {...register(`budget`)}
          placeholder="eg. 5000 Tk"
          className="font-medium"
        />
      </div>
    </div>
  );
};