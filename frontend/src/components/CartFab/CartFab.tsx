import { useCartStore } from '../../store/useCartStore';
import './CartFab.css';

interface CartFabProps {
  onClick: () => void;
}

export default function CartFab({ onClick }: CartFabProps) {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));



  return (
    <button
      className="cart-fab"
      type="button"
      onClick={onClick}
      aria-label="Ver carrito"
    >
      <div className="cart-fab-icon-wrapper">
        <svg
          className="cart-fab-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      <span className="cart-fab-text">Tu Pedido</span>
      <span className="cart-fab-badge">{totalItems}</span>
    </button>
  );
}
