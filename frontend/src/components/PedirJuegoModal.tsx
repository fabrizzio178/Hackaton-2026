import { useJuegos } from '../hooks/useApi';
import './Modal.css';
import './PedirJuegoModal.css';

interface PedirJuegoModalProps {
  onClose: () => void;
  onConfirm: (gameName: string) => void;
}

export function PedirJuegoModal({ onClose, onConfirm }: PedirJuegoModalProps) {
  const { juegos, loading } = useJuegos();
  const availableGames = juegos.filter(j => !j.soon);

  return (
    <div className="modal-overlay pedir-juego-overlay" onClick={onClose}>
      <div className="modal-sheet pedir-juego-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pedir Juego al Mozo</h2>
          <button className="modal-close-btn" onClick={onClose} type="button">✕</button>
        </div>
        <div className="modal-body pedir-juego-body">
          <p className="pedir-juego-desc">¿Qué juego deseas que te acerquen a la mesa?</p>
          
          {loading ? (
            <div className="pedir-juego-grid">
              {[1, 2, 3].map(n => (
                 <div key={n} className="skeleton skeleton-btn" style={{ height: '80px' }} />
              ))}
            </div>
          ) : (
            <div className="pedir-juego-grid">
              {availableGames.map(j => (
                <button
                  key={j.idJuego}
                  className="pedir-juego-btn"
                  onClick={() => onConfirm(j.nombre)}
                  type="button"
                >
                  <span className="pedir-juego-emoji">{j.emoji}</span>
                  <span className="pedir-juego-label">{j.nombre}</span>
                </button>
              ))}
              {availableGames.length === 0 && (
                <p>No hay juegos disponibles por el momento.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
