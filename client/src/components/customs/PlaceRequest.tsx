import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "sonner";

import { ShoppingBasket, CirclePlus } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function handleData(data, itemsInBasket): string[] {
  if ("error_msg" in data) {
    return [];
  }
  const elements: string[] = [];
  data.map((item) => {
    if (!itemsInBasket.includes(item)) {
      elements.push(item);
    }
  });

  return elements;
}

export default function PlaceRequest() {
  const [itemSearch, setItemSearch] = useState("i");
  const [searchResult, setSearchResult] = useState<string[]>();
  const [searchInProgress, setSearchInProgress] = useState(false);

  const [itemsInBasket, setItemsInBasket] = useState<string[]>([]);

  // https://stackoverflow.com/q/53253940
  const firstUpdate = useRef(true);

  useEffect(() => {
    // don't search on first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setSearchInProgress(true);
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/search?q=${itemSearch.trim()}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSearchResult(handleData(data, itemsInBasket));
        setSearchInProgress(false);
      })
      .catch(() => {
        console.error(
          "search error, if you see this message report to administrator"
        );
        setSearchInProgress(false);
      });
  }, [itemSearch]);
  return (
    <>
      {itemsInBasket.length > 0 ? (
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Order Items
        </h3>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        {itemsInBasket.map((ele) => (
          <Button
            onClick={() => {
              setItemsInBasket(itemsInBasket.filter((item) => item !== ele));
              toast(`${ele} removed from the basket`, {
                action: {
                  label: "Undo",
                  onClick: () => setItemsInBasket((prev) => [...prev, ele]),
                },
              });
            }}
            className="strike-on-hover"
          >
            {ele}
          </Button>
        ))}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <ShoppingBasket /> New Order
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New Order</SheetTitle>
            <SheetDescription>
              Don't forget to press "submit" when you're done!
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 mx-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Items
              </Label>
              <Input
                id="items"
                value={itemSearch}
                className="col-span-3"
                onChange={(e) => setItemSearch(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              {searchResult?.map((ele) => (
                <Button
                  onClick={() => {
                    // First add item to useState
                    setItemsInBasket([...itemsInBasket, ele]);
                    // Then remove it from the options
                    setSearchResult(
                      searchResult.filter((item) => item !== ele)
                    );
                  }}
                >
                  <CirclePlus /> {ele}
                </Button>
              ))}
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
