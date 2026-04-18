import { useState } from 'react'

export function GlobalDice() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)

  function roll() {
    setRolling(true)
    setValue(null)
    setTimeout(() => {
      setValue(Math.floor(Math.random() * 6) + 1)
      setRolling(false)
    }, 600)
  }

  return (
    <>
      <button
        className="fab fab--dice"
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Tirar Dado"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-card__title">Tirar Dado</h3>

            <div className={`dice-face ${rolling ? 'dice-face--rolling' : ''}`}>
              {rolling ? '…' : (value ?? '?')}
            </div>

            <div className="modal-actions">
              <button className="btn btn--ghost" onClick={() => setIsOpen(false)} type="button">
                Cerrar
              </button>
              <button className="btn btn--primary" onClick={roll} disabled={rolling} type="button">
                ¡Tirar!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
