import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';

import toast from 'react-hot-toast';

interface CartStore {
  items: Product[];

  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      // if (existingItem) {
      //   return toast('You have already added this Product to your Cart');
      // }

      set({ items: [...get().items, data] });

      toast.success('Product added to your Cart');
    },

    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });

      toast.success('Product removed from your Cart');
    },

    removeAll: () => set({ items: [] })
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart;