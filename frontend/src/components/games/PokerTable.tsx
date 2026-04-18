import { useState } from 'react'
import './PokerTable.css'

interface Player {
  id: number
  name: string
  chips: number
}

const STEPS = [25, 50, 100, 500]
const BUY_IN_STEP = 100

export function PokerTable() {
  const [phase, setPhase] = useState<'setup' | 'game'>('setup')
  const [playerCount, setPlayerCount] = useState(4)
  const [buyIn, setBuyIn] = useState(1000)
  const [players, setPlayers] = useState<Player[]>([])
  const [pot, setPot] = useState(0)
  const [dealerIdx, setDealerIdx] = useState(0)
  const [step, setStep] = useState(100)

  function handleStart() {
    setPlayers(
      Array.from({ length: playerCount }, (_, i) => ({
        id: i,
        name: `J${i + 1}`,
        chips: buyIn,
      }))
    )
    setPot(0)
    setDealerIdx(0)
    setPhase('game')
  }

  function adjustChips(playerId: number, delta: number) {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId
          ? { ...p, chips: Math.max(0, p.chips + delta) }
          : p
      )
    )
  }

  function nextHand() {
    setDealerIdx(prev => (prev + 1) % players.length)
  }

  function reset() {
    setPhase('setup')
    setPlayers([])
    setPot(0)
    setDealerIdx(0)
  }

  if (phase === 'setup') {
    return (
      <div className="poker-setup">
        <div className="poker-setup-group">
          <p className="poker-setup-label">Jugadores</p>
          <div className="poker-count-pills">
            {[2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                type="button"
                className={`poker-pill ${playerCount === n ? 'active' : ''}`}
                onClick={() => setPlayerCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="poker-setup-group">
          <p className="poker-setup-label">Fichas por jugador</p>
          <div className="poker-buyin-row">
            <button
              className="poker-spin-btn"
              type="button"
              onClick={() => setBuyIn(v => Math.max(BUY_IN_STEP, v - BUY_IN_STEP))}
            >
              ▼
            </button>
            <span className="poker-buyin-val">{buyIn.toLocaleString()}</span>
            <button
              className="poker-spin-btn"
              type="button"
              onClick={() => setBuyIn(v => v + BUY_IN_STEP)}
            >
              ▲
            </button>
          </div>
        </div>

        <button className="poker-start-btn" type="button" onClick={handleStart}>
          COMENZAR
        </button>
      </div>
    )
  }

  return (
    <div className="poker-game">
      {/* Pot */}
      <div className="poker-pot">
        <p className="poker-pot-label">Bote</p>
        <p className="poker-pot-amount">{pot.toLocaleString()}</p>
        <div className="poker-pot-btns">
          {STEPS.map(s => (
            <button
              key={`pot-${s}`}
              type="button"
              className="poker-pot-btn"
              onClick={() => setPot(v => Math.max(0, v - s))}
            >
              −{s}
            </button>
          ))}
          {STEPS.map(s => (
            <button
              key={`pot+${s}`}
              type="button"
              className="poker-pot-btn"
              onClick={() => setPot(v => v + s)}
            >
              +{s}
            </button>
          ))}
        </div>
      </div>

      {/* Step selector */}
      <div className="poker-step-row">
        <span className="poker-step-label">Paso</span>
        <div className="poker-step-pills">
          {STEPS.map(s => (
            <button
              key={s}
              type="button"
              className={`poker-step-pill ${step === s ? 'active' : ''}`}
              onClick={() => setStep(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Players */}
      <ul className="poker-players">
        {players.map((p, i) => {
          const isDealer = i === dealerIdx
          const broke = p.chips === 0
          return (
            <li key={p.id} className={`poker-player-row ${broke ? 'broke' : ''}`}>
              <div className={`poker-dealer-badge ${isDealer ? 'visible' : ''}`}>D</div>
              <span className="poker-player-name">{p.name}</span>
              <span className={`poker-chip-count ${broke ? 'zero' : ''}`}>
                {broke ? 'sin fichas' : p.chips.toLocaleString()}
              </span>
              <div className="poker-player-btns">
                <button
                  type="button"
                  className="poker-btn minus"
                  disabled={broke}
                  onClick={() => adjustChips(p.id, -step)}
                  aria-label={`Restar ${step} a ${p.name}`}
                >
                  −
                </button>
                <button
                  type="button"
                  className="poker-btn plus"
                  onClick={() => adjustChips(p.id, step)}
                  aria-label={`Sumar ${step} a ${p.name}`}
                >
                  +
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Actions */}
      <div className="poker-actions">
        <button type="button" className="poker-action-btn primary" onClick={nextHand}>
          Siguiente mano →
        </button>
        <button type="button" className="poker-action-btn secondary" onClick={reset}>
          Reiniciar
        </button>
      </div>
    </div>
  )
}
