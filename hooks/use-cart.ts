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
  removeSpecificNumber: (data: CartOrder) => void;

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

          {data.orderQty === 1 ? 
            toast.success(
              `Added ${data.orderQty} item to the Cart`
            ) : toast.success(
              `Added ${data.orderQty} items to the Cart`
            ); 
          }
        } else if (availableInStock > 0) {
          existingItem.orderQty += availableInStock;

          set({ items: [...currentItems] });

          {data.orderQty === 1 ? 
            toast.success(
              `Added ${availableInStock} item to the Cart. This product is now Out of Stock`
            ) : toast.success(
              `Added ${availableInStock} items to the Cart. This product is now Out of Stock`
            ); 
          }
        } else {
          toast.error('This Product is currently out of Stock');
        }
      } else {
        set({ items: [...currentItems, data] });

        {data.orderQty === 1 ? 
          toast.success(
            `Added ${data.orderQty} item to the Cart`
          ) : toast.success(
            `Added ${data.orderQty} items to the Cart`
          ); 
        }
      }
    },





    
    removeSpecificNumber: (data: CartOrder) => {
      const currentItems: CartOrder[] = get().items;
      
      const existingItem: CartOrder | undefined = 
      currentItems.find((item) => item.id === data.id);

      const availableInStock: number = data.quantity - 
      (existingItem ? existingItem.orderQty : 0);

      if (existingItem) {
        if (availableInStock >= data.orderQty) {
          existingItem.orderQty -= data.orderQty;
          
          if (existingItem.orderQty > 0) {
            set({ items: [...currentItems] });

            if (existingItem.orderQty > data.quantity) {
              set({ items: [] });
            }

            if (existingItem.orderQty <= data.quantity) {
              {data.orderQty === 1 ? 
                toast.success(
                  `Removed ${data.orderQty} item from the Cart`
                ) : toast.success(
                  `Removed ${data.orderQty} items from the Cart`
                ); 
              }
            }
          } else {
            set({ items: [] });
          }
        } else if (availableInStock === 0) {
          existingItem.orderQty -= data.orderQty;

          set({ items: [...currentItems] }); 
          
          {data.orderQty === 1 
          ? 
            toast.success(
              `Removed ${data.orderQty} item from the Cart`
            ) 
          : 
            toast.success(
              `Removed ${data.orderQty} items from the Cart`
            ); 
          
            if (data.orderQty === 0) {
              set({ items: [] });
            }
          }
        } else {
          set({ items: [] });
        }
      } else {
        set({ items: [] });
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