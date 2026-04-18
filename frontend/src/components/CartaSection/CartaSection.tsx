import { useCartStore } from '../../store/useCartStore';
import { menuData, formatPrice } from '../../data/menuData';
import type { MenuItem } from '../../types/menu';
import './CartaSection.css';

function CartaItem({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const quantity = useCartStore((s) => {
    const found = s.items.find((i) => i.menuItem.id === item.id);
    return found ? found.quantity : 0;
  });

  return (
    <div className="carta-item">
      <div className="carta-item-photo">
        <span className="carta-item-emoji">{item.emoji}</span>
      </div>

      <div className="carta-item-info">
        <span className="carta-item-name">{item.name}</span>
        <span className="carta-item-desc">{item.description}</span>
        <span className="carta-item-price">{formatPrice(item.price)}</span>
      </div>

      <div className="carta-item-controls">
        {quantity > 0 ? (
          <>
            <button
              className="qty-btn qty-minus"
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Quitar ${item.name}`}
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
          </>
        ) : null}
        <button
          className="qty-btn qty-plus"
          type="button"
          onClick={() => addItem(item)}
          aria-label={`Agregar ${item.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function CartaSection() {
  return (
    <div className="carta-section">
      {menuData.map((category) => (
        <div key={category.id} className="carta-category">
          <div className="carta-category-header">
            <span className="carta-category-emoji">{category.emoji}</span>
            <h2 className="carta-category-title">{category.name}</h2>
          </div>
          <div className="carta-items">
            {category.items.map((item) => (
              <CartaItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
      {/* spacer for FAB */}
      <div style={{ height: '80px' }} />
    </div>
  );
}
