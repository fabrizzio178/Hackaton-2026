import type { MenuCategory } from '../types/menu';

export const menuData: MenuCategory[] = [
  {
    id: 'entradas',
    name: 'Entradas',
    emoji: '🧆',
    items: [
      { id: 'nachos', name: 'Nachos con Cheddar', description: 'Nachos crocantes con cheddar fundido, jalapeños y crema agria', price: 4500, emoji: '🧀', categoryId: 'entradas' },
      { id: 'empanadas', name: 'Empanadas (x3)', description: 'Empanadas de carne cortada a cuchillo', price: 3800, emoji: '🥟', categoryId: 'entradas' },
      { id: 'papas-fritas', name: 'Papas Fritas', description: 'Papas fritas caseras con salsa especial de la casa', price: 3200, emoji: '🍟', categoryId: 'entradas' },
      { id: 'tabla-quesos', name: 'Tabla de Quesos', description: 'Selección de quesos con frutos secos y miel', price: 6500, emoji: '🧀', categoryId: 'entradas' },
    ],
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    emoji: '🍕',
    items: [
      { id: 'muzza', name: 'Muzzarella', description: 'Pizza clásica con muzzarella y aceitunas', price: 7000, emoji: '🍕', categoryId: 'pizzas' },
      { id: 'napolitana', name: 'Napolitana', description: 'Muzzarella, tomate en rodajas y ajo', price: 7500, emoji: '🍅', categoryId: 'pizzas' },
      { id: 'fugazzeta', name: 'Fugazzeta', description: 'Rellena de muzzarella con cebolla caramelizada', price: 8000, emoji: '🧅', categoryId: 'pizzas' },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sándwiches',
    emoji: '🍔',
    items: [
      { id: 'hamburguesa', name: 'Hamburguesa Clásica', description: 'Carne 200g, cheddar, lechuga, tomate y aderezos', price: 6500, emoji: '🍔', categoryId: 'sandwiches' },
      { id: 'lomito', name: 'Lomito Completo', description: 'Lomo, jamón, queso, lechuga, tomate y huevo', price: 7500, emoji: '🥩', categoryId: 'sandwiches' },
      { id: 'club-sandwich', name: 'Club Sándwich', description: 'Triple de pollo, panceta, queso, lechuga y mayo', price: 5800, emoji: '🥪', categoryId: 'sandwiches' },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    emoji: '🍺',
    items: [
      { id: 'cerveza', name: 'Cerveza Artesanal', description: 'Pinta de cerveza artesanal del día (500ml)', price: 3500, emoji: '🍺', categoryId: 'bebidas' },
      { id: 'fernet', name: 'Fernet con Coca', description: 'Fernet Branca con Coca-Cola', price: 4000, emoji: '🥃', categoryId: 'bebidas' },
      { id: 'gin-tonic', name: 'Gin Tonic', description: 'Gin con tónica, pepino y botánicos', price: 5500, emoji: '🍸', categoryId: 'bebidas' },
      { id: 'gaseosa', name: 'Gaseosa', description: 'Coca-Cola, Sprite o Fanta (500ml)', price: 1800, emoji: '🥤', categoryId: 'bebidas' },
      { id: 'agua', name: 'Agua Mineral', description: 'Con o sin gas (500ml)', price: 1200, emoji: '💧', categoryId: 'bebidas' },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    emoji: '🍰',
    items: [
      { id: 'brownie', name: 'Brownie con Helado', description: 'Brownie de chocolate con helado de vainilla', price: 4200, emoji: '🍫', categoryId: 'postres' },
      { id: 'flan', name: 'Flan Casero', description: 'Flan con dulce de leche y crema', price: 3500, emoji: '🍮', categoryId: 'postres' },
    ],
  },
];

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-AR')}`;
}
