import { create } from 'zustand';
import type { MenuItem, CartItem } from '../types/menu';

interface CartState {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  getItemQuantity: (menuItemId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (menuItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItem.id === menuItem.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { menuItem, quantity: 1 }] };
    });
  },

  removeItem: (menuItemId) => {
    set((state) => {
      const existing = state.items.find((i) => i.menuItem.id === menuItemId);
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return { items: state.items.filter((i) => i.menuItem.id !== menuItemId) };
      }
      return {
        items: state.items.map((i) =>
          i.menuItem.id === menuItemId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      };
    });
  },

  getItemQuantity: (menuItemId) => {
    const item = get().items.find((i) => i.menuItem.id === menuItemId);
    return item ? item.quantity : 0;
  },

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),

  clearCart: () => set({ items: [] }),
}));
