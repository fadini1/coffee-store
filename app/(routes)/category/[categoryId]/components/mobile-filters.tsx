'use client';

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";

import Button from "@/components/ui/my-button";
import IconButton from "@/components/ui/icon-button";

import Filter from "./filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
};

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button 
      className="flex items-center gap-x-2 lg:hidden" 
      onClick={onOpen}>
        Filters

        <Plus size={20} />
      </Button>

      <Dialog 
      as="div"
      className='relative z-40 lg:hidden'
      open={open}
      onClose={onClose}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-20" 
        />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className='relative ml-auto flex h-full w-full
          max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl
          dark:bg-zinc-900'>
            <div className="flex items-center justify-end px-4">
              <IconButton
                className="dark:text-zinc-900 dark:hover:bg-zinc-100
                dark:bg-zinc-300"
                icon={<X size={15} />}
                onClick={onClose}
              />
            </div>

            <div className="p-4">
              <Filter 
                name='Sizes'
                valueKey='sizeId'
                data={sizes}
              />

              <Filter 
                name='Colors'
                valueKey='colorId'
                data={colors}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default MobileFilters;