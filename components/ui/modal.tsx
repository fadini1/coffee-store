'use client';

import { Fragment } from 'react';
import { X } from 'lucide-react';

import { Dialog, Transition } from "@headlessui/react";

import IconButton from '@/components/ui/icon-button';

interface ModalProps {
  open: boolean;

  children: React.ReactNode;

  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  onClose
}) => {
  return (
    <Transition 
      appear 
      show={open} 
      as={Fragment}
    >
      <Dialog 
        as='div' 
        className='relative z-10'
        onClose={onClose}
      >
        <div 
          className='fixed inset-0 bg-black bg-opacity-50'
        />

        <div
          className='fixed inset-0 overflow-y-auto'
        >
          <div
            className='flex items-center justify-center text-center 
            min-h-full p-4'
          >
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              as={Fragment}
            >
              <Dialog.Panel
                className='w-full max-w-3xl overflow-hidden rounded-lg 
                text-left align-middle'
              >
                <div
                  className='relative flex items-center w-full px-4  
                  overflow-hidden pb-8 pt-14 shadow-2xl
                  sm:px-6 sm:pt-8 md:p-6 lg:p-8'
                >
                  <div
                    className='absolute right-4 top-4'
                  >
                    <IconButton
                      icon={<X size={15} />} 
                      onClick={onClose}
                    />
                  </div>

                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal;