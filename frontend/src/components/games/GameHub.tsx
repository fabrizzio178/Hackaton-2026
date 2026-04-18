import { useState } from 'react'
import './games.css'
import { GameDetailLayout } from './GameDetailLayout'
import { TrucoTool } from './TrucoTool'
import { GlobalDice } from './GlobalDice'
import { GlobalRandomizer } from './GlobalRandomizer'

export function GameHub() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [showRules, setShowRules] = useState(false)

  /* ---- Truco activo ---- */
  if (activeGame === 'TRUCO') {
    return (
      <>
        <GameDetailLayout
          title="Anotador de Truco"
          onBack={() => setActiveGame(null)}
          onOpenRules={() => setShowRules(true)}
        >
          <TrucoTool />
        </GameDetailLayout>

        {showRules && (
          <div className="modal-overlay" onClick={() => setShowRules(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <h3 className="modal-card__title">Reglas del Truco</h3>
              <p className="rules-body">
                El truco se juega a 15 o 30 puntos. Se reparten 3 cartas por jugador.
                En este momento, escaneá el QR en la mesa para ver el PDF completo de las reglas oficiales.
              </p>
              <button className="btn btn--primary btn--full" onClick={() => setShowRules(false)} type="button">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  /* ---- Grilla de selección ---- */
  return (
    <div className="ghub">
      <h1 className="ghub__heading">Juegos de Mesa</h1>
      <p className="ghub__sub">Seleccioná una herramienta para tu mesa.</p>

      <div className="ghub__grid">
        {/* Truco */}
        <button className="ghub__card" onClick={() => setActiveGame('TRUCO')} type="button">
          <span className="ghub__card-emoji">🃏</span>
          <span className="ghub__card-label">Anotador de Truco</span>
        </button>

        {/* Placeholder */}
        <button className="ghub__card ghub__card--disabled" type="button" disabled>
          <span className="ghub__card-emoji">🎴</span>
          <span className="ghub__card-label">Chinchón (Pronto)</span>
        </button>
      </div>

      {/* Utilidades flotantes */}
      <GlobalDice />
      <GlobalRandomizer />
    </div>
  )
}
