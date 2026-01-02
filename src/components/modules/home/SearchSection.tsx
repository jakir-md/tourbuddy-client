"use client"
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { SearchFields } from "./SearchFields";
import { queryStringFormatter } from "@/lib/formatter";
import { getNewDate } from "@/lib/getNewDate";
import { useRouter } from "next/navigation";

export default function SearchSection() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      startDate: "",
      searchTerm: "",
      category: "",
    },
  });

  const onSubmit = (data: any) => {
    if (data.startDate !== "") data.startDate = getNewDate(data.startDate, 0);
    router.push(`/explore?${queryStringFormatter(data)}`);
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SearchFields />
          <div className="mt-5"></div>
          <Button
            size="lg"
            className="hover:cursor-pointer w-full h-14 md:h-12 bg-primary hover:bg-primary/90 text-lg shadow-lg shadow-primary/30"
            disabled={form.formState.isSubmitting}
          >
            <Search className="w-5 h-5 mr-2" />
            {form.formState.isSubmitting ? "Searching" : "Search"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
