import { useRef, useCallback } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../data/menuData';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0)
  );

  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !drawerRef.current) return;
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    if (diff > 0) {
      drawerRef.current.style.transform = `translateY(${diff}px)`;
      drawerRef.current.style.transition = 'none';
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !drawerRef.current) return;
    isDragging.current = false;
    const diff = currentY.current - startY.current;
    drawerRef.current.style.transition = '';
    drawerRef.current.style.transform = '';
    if (diff > 120) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div
        ref={drawerRef}
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="cart-drawer-handle">
          <div className="cart-drawer-handle-bar" />
        </div>

        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Tu Pedido</h2>
          <button className="cart-drawer-close" type="button" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Items list */}
        <div className="cart-drawer-items">
          {items.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío</p>
          ) : (
            items.map((cartItem) => (
              <div key={cartItem.menuItem.id} className="cart-drawer-item">
                <div className="cart-drawer-item-photo">
                  <span className="cart-drawer-item-emoji">{cartItem.menuItem.emoji}</span>
                </div>

                <div className="cart-drawer-item-info">
                  <span className="cart-drawer-item-name">{cartItem.menuItem.name}</span>
                  <span className="cart-drawer-item-subtotal">
                    {formatPrice(cartItem.menuItem.price)} × {cartItem.quantity} ={' '}
                    {formatPrice(cartItem.menuItem.price * cartItem.quantity)}
                  </span>
                </div>

                <div className="cart-drawer-item-controls">
                  <button
                    className="qty-btn qty-minus"
                    type="button"
                    onClick={() => removeItem(cartItem.menuItem.id)}
                  >
                    −
                  </button>
                  <span className="qty-value">{cartItem.quantity}</span>
                  <button
                    className="qty-btn qty-plus"
                    type="button"
                    onClick={() => addItem(cartItem.menuItem)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-drawer-total">
              <span className="cart-drawer-total-label">Total</span>
              <span className="cart-drawer-total-price">{formatPrice(totalPrice)}</span>
            </div>
            <button className="cart-confirm-btn" type="button">
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
