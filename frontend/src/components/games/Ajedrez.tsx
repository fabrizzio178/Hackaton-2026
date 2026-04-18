import { useState, useEffect, useRef } from 'react'
import { BaseScorer } from './BaseScorer'
import './Ajedrez.css'

const RULES = `# Reloj de Ajedrez\n\nCada jugador tiene el mismo tiempo inicial.\nAl tocar tu mitad de la pantalla, pausas tu reloj y activas el del oponente.\nGana quien no se quede sin tiempo.`

function msToDigits(ms: number) {
  const totalSec = Math.ceil(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return {
    mT: Math.floor(m / 10),
    mO: m % 10,
    sT: Math.floor(s / 10),
    sO: s % 10,
  }
}

function digitsToMs(mT: number, mO: number, sT: number, sO: number) {
  const m = mT * 10 + mO
  const s = sT * 10 + sO
  return (m * 60 + s) * 1000
}

function formatTime(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function DigitSpinner({ value, max, onChange }: { value: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="digit-spinner">
      <button className="digit-btn" type="button" onClick={() => onChange((value + 1) % (max + 1))}>▲</button>
      <span className="digit-val">{String(value)}</span>
      <button className="digit-btn" type="button" onClick={() => onChange((value - 1 + max + 1) % (max + 1))}>▼</button>
    </div>
  )
}

type ClockMode = 'setup' | 'running' | 'finished'

export function Ajedrez({ onBack }: { onBack: () => void }) {
  const DEFAULT_MS = 5 * 60 * 1000

  const [mT, setMT] = useState(0)
  const [mO, setMO] = useState(5)
  const [sT, setST] = useState(0)
  const [sO, setSO] = useState(0)

  const [mode, setMode] = useState<ClockMode>('setup')
  const [player1Ms, setPlayer1Ms] = useState(DEFAULT_MS)
  const [player2Ms, setPlayer2Ms] = useState(DEFAULT_MS)
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastTickRef = useRef<number>(0)

  useEffect(() => {
    if (mode !== 'running') {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    lastTickRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const delta = now - lastTickRef.current
      lastTickRef.current = now

      if (activePlayer === 1) {
        setPlayer1Ms(prev => {
          const next = Math.max(0, prev - delta)
          if (next === 0) setMode('finished')
          return next
        })
      } else {
        setPlayer2Ms(prev => {
          const next = Math.max(0, prev - delta)
          if (next === 0) setMode('finished')
          return next
        })
      }
    }, 100)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [mode, activePlayer])

  function handleStart() {
    const configMs = digitsToMs(mT, mO, sT, sO)
    const time = configMs > 0 ? configMs : DEFAULT_MS
    setPlayer1Ms(time)
    setPlayer2Ms(time)
    setActivePlayer(1)
    setMode('running')
  }

  function handleTap(tappedPlayer: 1 | 2) {
    if (mode === 'finished') return
    if (mode === 'running' && tappedPlayer === activePlayer) {
      setActivePlayer(tappedPlayer === 1 ? 2 : 1)
    }
  }

  function handleReset() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setMode('setup')
    setPlayer1Ms(DEFAULT_MS)
    setPlayer2Ms(DEFAULT_MS)
    setActivePlayer(1)
  }

  const winner = mode === 'finished' ? (player1Ms === 0 ? 2 : 1) : null

  return (
    <BaseScorer label="Ajedrez" emoji="♟️" rulesContent={RULES} onBack={onBack} showTitle={false} fullHeight>
      <div className="chess-wrapper">
        <div className="chess-clock-area">

          {mode === 'setup' ? (
            <div className="chess-setup">
              <p className="chess-setup-label">Tiempo por jugador</p>
              <div className="chess-spinners">
                <DigitSpinner value={mT} max={9} onChange={setMT} />
                <DigitSpinner value={mO} max={9} onChange={setMO} />
                <span className="chess-colon">:</span>
                <DigitSpinner value={sT} max={5} onChange={setST} />
                <DigitSpinner value={sO} max={9} onChange={setSO} />
              </div>
              <button className="chess-start-btn" type="button" onClick={handleStart}>
                INICIAR
              </button>
            </div>
          ) : (
            <div className="chess-halves">
              {/* Player 2 (izquierda cuando rotado = arriba en portrait) */}
              <div
                className={`chess-half player2 ${mode === 'finished' ? (winner === 2 ? 'winner' : 'loser') : activePlayer === 2 ? 'active' : 'inactive'}`}
                onClick={() => handleTap(2)}
              >
                <span className="chess-player-label">J2</span>
                <span className="chess-time">{formatTime(player2Ms)}</span>
                {mode === 'finished' && winner === 2 && <span className="chess-result">¡GANÓ!</span>}
              </div>

              <div className="chess-divider" />

              {/* Player 1 (derecha cuando rotado = abajo en portrait) */}
              <div
                className={`chess-half player1 ${mode === 'finished' ? (winner === 1 ? 'winner' : 'loser') : activePlayer === 1 ? 'active' : 'inactive'}`}
                onClick={() => handleTap(1)}
              >
                <span className="chess-player-label">J1</span>
                <span className="chess-time">{formatTime(player1Ms)}</span>
                {mode === 'finished' && winner === 1 && <span className="chess-result">¡GANÓ!</span>}
              </div>

              {mode === 'finished' && (
                <button className="chess-reset-btn" type="button" onClick={handleReset}>
                  Reiniciar
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </BaseScorer>
  )
}
