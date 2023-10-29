'use client';

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";

import qs from 'query-string';

import Button from "@/components/ui/my-button";

interface FilterProps {
  name: string;
  valueKey: string;
  
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({
  name,
  valueKey,
  data
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { 
      skipNull: true 
    });

    router.push(url);
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold -m-1">
        {name}
      </h3>

      <hr className="my-2" />

      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button 
            onClick={() => onClick(filter.id)}
            className={cn(
            `rounded-md text-sm text-zinc-900 px-3 py-1.5
            bg-zinc-100 border border-zinc-300 font-bold
            dark:hover:bg-zinc-300 transition border-none
            hover:bg-zinc-300 dark:bg-zinc-900 duration-200
            dark:text-zinc-400 hover:dark:bg-zinc-600
            hover:dark:text-zinc-300`,

            selectedValue === filter.id && `
              bg-zinc-900 text-zinc-100 hover:bg-zinc-600
              dark:bg-zinc-100 dark:text-zinc-900 
              dark:hover:bg-zinc-400 dark:hover:text-zinc-900
            `
            )}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter;