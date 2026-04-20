import { useState, useEffect, useRef } from 'react'
import { BaseScorer } from './BaseScorer'
import './Ajedrez.css'

const RULES = `# Reglas Completas del Ajedrez

El ajedrez es un juego de estrategia para dos jugadores que se juega en un tablero cuadriculado. El objetivo final es acorralar al rey del oponente de tal manera que no pueda evitar ser capturado, lo que se conoce como **Jaque Mate**.

---

### 1. El Tablero y la Disposición Inicial

El tablero consta de 64 casillas (32 claras y 32 oscuras) dispuestas en una cuadrícula de 8x8. 

* **Orientación del tablero:** El tablero debe colocarse de modo que cada jugador tenga una **casilla de color claro en su esquina inferior derecha**.
* **Las piezas:** Cada jugador comienza con 16 piezas: 1 Rey, 1 Reina (Dama), 2 Torres, 2 Alfiles, 2 Caballos y 8 Peones.
* **Orden en la primera fila:** De izquierda a derecha para las blancas: Torre, Caballo, Alfil, Reina, Rey, Alfil, Caballo, Torre. (La Reina siempre va en la casilla de su propio color).
* **Las blancas siempre mueven primero.**

---

### 2. El Movimiento de las Piezas

* **El Peón:** * Se mueve hacia adelante una casilla. 
    * En su primer movimiento, puede avanzar dos casillas.
    * Captura en diagonal hacia adelante.
* **El Caballo:** * Se mueve en forma de "L" (dos casillas en una dirección y una en ángulo recto).
    * Es la única pieza que puede saltar sobre otras.
* **El Alfil:** * Se mueve en línea recta diagonal cualquier número de casillas.
* **La Torre:** * Se mueve en línea recta horizontal o vertical cualquier número de casillas.
* **La Reina (Dama):** * Se mueve en cualquier dirección recta (horizontal, vertical o diagonal).
* **El Rey:** * Se mueve una sola casilla en cualquier dirección. No puede moverse a una casilla donde quede en jaque.

---

### 3. Movimientos Especiales

#### A. La Coronación (o Promoción)
Si un peón llega a la octava fila del oponente, debe ser transformado en cualquier otra pieza de su mismo color (Reina, Torre, Alfil o Caballo).

#### B. La Captura "Al Paso" (En Passant)
Si un peón avanza dos casillas y queda al lado de un peón oponente, el oponente puede capturarlo como si solo hubiera avanzado una casilla. Solo puede hacerse en el turno inmediatamente posterior.

#### C. El Enroque
Es un movimiento conjunto del Rey y una Torre. El Rey se mueve dos casillas hacia la Torre y la Torre se coloca al otro lado del Rey.
**Requisitos:** No haber movido el Rey ni la Torre antes, que el camino esté libre y que el Rey no esté en jaque ni pase por una casilla atacada.

---

### 4. Jaque y Jaque Mate

* **Jaque:** Cuando el Rey está bajo ataque directo. El jugador debe salir del jaque inmediatamente.
* **Jaque Mate:** Cuando el Rey está en jaque y no existe ningún movimiento legal para escapar. El juego termina y el atacante gana.

---

### 5. El Empate (Tablas)

La partida termina en empate si:
1. **Rey Ahogado:** El jugador no tiene movimientos legales y su Rey NO está en jaque.
2. **Mutuo Acuerdo:** Ambos jugadores aceptan el empate.
3. **Repetición:** La misma posición ocurre tres veces.
4. **Regla de los 50 Movimientos:** Pasan 50 jugadas sin capturas ni movimientos de peón.
5. **Material Insuficiente:** Ningún jugador tiene piezas suficientes para dar mate.
`

function formatTime(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

type ClockMode = 'setup' | 'running' | 'finished'

export function Ajedrez({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<ClockMode>('setup')
  const [player1Ms, setPlayer1Ms] = useState(0)
  const [player2Ms, setPlayer2Ms] = useState(0)
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

  function handleStartPreset(minutes: number) {
    const timeMs = minutes * 60 * 1000
    setPlayer1Ms(timeMs)
    setPlayer2Ms(timeMs)
    setActivePlayer(1) // Empiezan blancas
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
    setActivePlayer(1)
  }

  const winner = mode === 'finished' ? (player1Ms === 0 ? 2 : 1) : null

  return (
    <BaseScorer label="Ajedrez" emoji="♟️" rulesContent={RULES} onBack={onBack} showTitle={false} fullHeight>
      <div className="chess-wrapper">
        <div className="chess-clock-area">

          {mode === 'setup' ? (
            <div className="chess-setup-modes">
              <h3 className="chess-setup-title">Seleccionar Tiempo</h3>
              <div className="chess-preset-grid">
                <button className="chess-preset-btn bullet" onClick={() => handleStartPreset(1)} type="button">
                  <span className="preset-icon">⚡</span>
                  <span className="preset-time">1 Min</span>
                  <span className="preset-label">Bullet</span>
                </button>
                <button className="chess-preset-btn blitz" onClick={() => handleStartPreset(5)} type="button">
                  <span className="preset-icon">🔥</span>
                  <span className="preset-time">5 Min</span>
                  <span className="preset-label">Blitz</span>
                </button>
                <button className="chess-preset-btn normal" onClick={() => handleStartPreset(10)} type="button">
                  <span className="preset-icon">🧠</span>
                  <span className="preset-time">10 Min</span>
                  <span className="preset-label">Normal</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="chess-halves">
              {/* Player 2 (izquierda cuando rotado = arriba en portrait) - Negras */}
              <div
                className={`chess-half player2 \${mode === 'finished' ? (winner === 2 ? 'winner' : 'loser') : activePlayer === 2 ? 'active' : 'inactive'}`}
                onClick={() => handleTap(2)}
              >
                <div className="chess-player-indicator">Negras</div>
                <span className="chess-time">{formatTime(player2Ms)}</span>
                {mode === 'finished' && winner === 2 && <span className="chess-result">GANADOR</span>}
              </div>

              <div className="chess-divider" />

              {/* Player 1 (derecha cuando rotado = abajo en portrait) - Blancas */}
              <div
                className={`chess-half player1 \${mode === 'finished' ? (winner === 1 ? 'winner' : 'loser') : activePlayer === 1 ? 'active' : 'inactive'}`}
                onClick={() => handleTap(1)}
              >
                <div className="chess-player-indicator">Blancas</div>
                <span className="chess-time">{formatTime(player1Ms)}</span>
                {mode === 'finished' && winner === 1 && <span className="chess-result">GANADOR</span>}
              </div>

              {mode === 'finished' && (
                <button className="chess-reset-btn" type="button" onClick={handleReset}>
                  VOLVER
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </BaseScorer>
  )
}
