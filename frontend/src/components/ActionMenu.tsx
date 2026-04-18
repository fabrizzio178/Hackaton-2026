import { useState } from 'react'
import './ActionMenu.css'

interface ActionMenuProps {
  onOpenRules: () => void
  onOpenChat: () => void
}

export function ActionMenu({ onOpenRules, onOpenChat }: ActionMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="action-menu">
      <button
        className="action-main-btn"
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className={`action-arrow ${open ? 'rotated' : ''}`}>▼</span>
      </button>

      <div className={`action-menu-items ${open ? 'open' : ''}`}>
        <button
          className="action-item-btn"
          type="button"
          onClick={() => { setOpen(false); onOpenRules() }}
          aria-label="Reglas"
        >
          <span className="action-item-emoji">📖</span>
          <span className="action-item-label">Reglas</span>
        </button>
        <button
          className="action-item-btn"
          type="button"
          onClick={() => { setOpen(false); onOpenChat() }}
          aria-label="Chat IA"
        >
          <span className="action-item-emoji">🤖</span>
          <span className="action-item-label">IA</span>
        </button>
      </div>
    </div>
  )
}
