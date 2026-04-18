import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

type AnimationControls = ReturnType<typeof useAnimation>
import { BaseScorer } from './BaseScorer'
import './Dados.css'

const RULES = `# Dados\n\nTira 1, 2 o 3 dados de 6 caras.\nToca el botón correspondiente para lanzar.`

const VALUE_TRANSFORM: Record<number, { rotateX: number; rotateY: number }> = {
  1: { rotateX: 0,    rotateY: 0   },
  2: { rotateX: 0,    rotateY: 180 },
  3: { rotateX: -90,  rotateY: 0   },
  4: { rotateX: 90,   rotateY: 0   },
  5: { rotateX: 0,    rotateY: -90 },
  6: { rotateX: 0,    rotateY: 90  },
}

const T = true, F = false

const PIPS: Record<number, boolean[]> = {
  1: [F, F, F,  F, T, F,  F, F, F],
  2: [F, F, T,  F, F, F,  T, F, F],
  3: [F, F, T,  F, T, F,  T, F, F],
  4: [T, F, T,  F, F, F,  T, F, T],
  5: [T, F, T,  F, T, F,  T, F, T],
  6: [T, F, T,  T, F, T,  T, F, T],
}

function DieFace({ value }: { value: number }) {
  return (
    <div className="die-face-inner">
      {PIPS[value].map((on, i) => (
        <div key={i} className={`pip ${on ? 'on' : ''}`} />
      ))}
    </div>
  )
}

interface Die3DProps {
  controls: AnimationControls
  result: number | null
}

function Die3D({ controls, result }: Die3DProps) {
  return (
    <div className="die-scene">
      <motion.div
        className="die-cube"
        animate={controls}
        initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
      >
        <div className="die-face face-front"><DieFace value={1} /></div>
        <div className="die-face face-back"><DieFace value={2} /></div>
        <div className="die-face face-top"><DieFace value={3} /></div>
        <div className="die-face face-bottom"><DieFace value={4} /></div>
        <div className="die-face face-right"><DieFace value={5} /></div>
        <div className="die-face face-left"><DieFace value={6} /></div>
      </motion.div>
      {result !== null && (
        <div className="die-result-label">{result}</div>
      )}
    </div>
  )
}

const MAX_DICE = 3

export function Dados({ onBack }: { onBack: () => void }) {
  const [results, setResults] = useState<number[]>([])
  const [rolling, setRolling] = useState(false)
  const [diceCount, setDiceCount] = useState(1)

  const controls = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ]

  async function roll(count: number) {
    if (rolling) return
    setDiceCount(count)
    setResults([])
    setRolling(true)

    const shakePromises = controls.slice(0, count).map(ctrl =>
      ctrl.start({
        rotateX: [0, 180, 360, 540, 270, 450],
        rotateY: [0, 270, 90, 360, 180, 540],
        rotateZ: [0, 45, -45, 90, 0],
        transition: { duration: 0.75, ease: 'easeInOut' },
      })
    )
    await Promise.all(shakePromises)

    const newResults = Array.from({ length: count }, () => Math.ceil(Math.random() * 6))
    setResults(newResults)

    const settlePromises = newResults.map((val, i) =>
      controls[i].start({
        rotateX: VALUE_TRANSFORM[val].rotateX,
        rotateY: VALUE_TRANSFORM[val].rotateY,
        rotateZ: 0,
        transition: { type: 'spring', stiffness: 120, damping: 14 },
      })
    )
    await Promise.all(settlePromises)

    setRolling(false)
  }

  const total = results.length > 1 ? results.reduce((a, b) => a + b, 0) : null

  return (
    <BaseScorer label="Dados" emoji="🎯" rulesContent={RULES} onBack={onBack} showTitle={false} fullHeight>
      <div className="dice-wrapper">
        <div className="dice-area">
          <div className={`dice-row count-${diceCount}`}>
            {Array.from({ length: diceCount }).map((_, i) => (
              <Die3D
                key={i}
                controls={controls[i]}
                result={results[i] ?? null}
              />
            ))}
          </div>

          {total !== null && !rolling && (
            <motion.p
              className="dice-total"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Total: {total}
            </motion.p>
          )}
        </div>

        <div className="dice-btn-row">
          {([1, 2, 3] as const).map(n => (
            <button
              key={n}
              className={`dice-btn ${diceCount === n && results.length > 0 ? 'active' : ''}`}
              type="button"
              disabled={rolling}
              onClick={() => roll(n)}
            >
              <span className="dice-btn-emoji">{'🎲'.repeat(n)}</span>
              <span className="dice-btn-label">×{n}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseScorer>
  )
}
