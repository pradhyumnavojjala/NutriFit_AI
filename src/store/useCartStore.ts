import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (product) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    let updatedItems;

    if (existingItem) {
      updatedItems = get().items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...get().items, { ...product, quantity: 1 }];
    }

    const total = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    set({ items: updatedItems, total });
  },

  removeItem: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    const total = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ items: updatedItems, total });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
