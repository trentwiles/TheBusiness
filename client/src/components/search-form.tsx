import { Search } from "lucide-react";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [searchedText, setSearchedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedText) {
      navigate(`/search/${searchedText}`, { replace: true });
    }
  }, [searchedText]);

  function handleQuery(e: React.KeyboardEvent): void {
    // prevent the search button from acting like a form
    if (e.key == "Enter") {
      e.preventDefault();
    }
  }

  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          value={searchedText}
          className="h-8 pl-7"
          onKeyDown={handleQuery}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
