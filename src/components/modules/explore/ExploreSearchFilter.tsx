"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ExploreSearchFilters() {
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

  const hasActiveFilters = searchParams.get("searchTerm");

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

        {/* Clear Filters */}
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
