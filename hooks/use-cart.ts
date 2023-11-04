import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';

import toast from 'react-hot-toast';

export interface CartOrder extends Product {
  orderQty: number;
}

interface CartStore {
  items: CartOrder[];

  addItem: (data: CartOrder) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
};

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    
    addItem: (data: CartOrder) => {
      const currentItems: CartOrder[] = get().items;

      const existingItem: CartOrder | undefined = 
      currentItems.find((item) => item.id === data.id);

      const availableInStock: number = data.quantity - 
      (existingItem ? existingItem.orderQty : 0);

      if (existingItem) {
        if (availableInStock >= data.orderQty) {
          existingItem.orderQty += data.orderQty;

          set({ items: [...currentItems] });

          toast.success(`Added ${data.orderQty} to the Product`);
        } else if (availableInStock > 0) {
          existingItem.orderQty += availableInStock;

          set({ items: [...currentItems] });

          toast.success(`
            Added ${availableInStock} to the Cart. Maximum Stock reached.
          `);
        } else {
          toast.error('This Product is currently out of Stock');
        }
      } else {
        set({ items: [...currentItems, data] });

        toast.success(`${data.quantity} copies of this Product added to Cart`);
      }
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