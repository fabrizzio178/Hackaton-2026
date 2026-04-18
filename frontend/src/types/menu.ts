export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
