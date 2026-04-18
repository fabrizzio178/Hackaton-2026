import { useState } from 'react'
import './Scoreboard.css'

interface ScoreboardProps {
  team1: string
  team2: string
  maxScore?: number
}

export function Scoreboard({ team1, team2, maxScore }: ScoreboardProps) {
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  const winner =
    maxScore && score1 >= maxScore ? 1 :
    maxScore && score2 >= maxScore ? 2 : null

  function reset() {
    setScore1(0)
    setScore2(0)
  }

  function change(team: 1 | 2, delta: number) {
    if (winner) return
    const setter = team === 1 ? setScore1 : setScore2
    setter(prev => Math.max(0, prev + delta))
  }

  return (
    <div className="scoreboard">
      <div className="scoreboard-row">
        <TeamColumn
          name={team1}
          score={score1}
          winner={winner === 1}
          onPlus={() => change(1, 1)}
          onMinus={() => change(1, -1)}
        />
        <div className="scoreboard-divider" />
        <TeamColumn
          name={team2}
          score={score2}
          winner={winner === 2}
          onPlus={() => change(2, 1)}
          onMinus={() => change(2, -1)}
        />
      </div>

      {winner && (
        <p className="scoreboard-winner">¡{winner === 1 ? team1 : team2} gana!</p>
      )}

      <button className="scoreboard-reset" type="button" onClick={reset}>
        Reiniciar
      </button>
    </div>
  )
}

interface TeamColumnProps {
  name: string
  score: number
  winner: boolean
  onPlus: () => void
  onMinus: () => void
}

function TeamColumn({ name, score, winner, onPlus, onMinus }: TeamColumnProps) {
  return (
    <div className={`team-col ${winner ? 'winner' : ''}`}>
      <span className="team-name">{name}</span>
      <span className="team-score">{score}</span>
      <div className="team-btns">
        <button className="team-btn minus" type="button" onClick={onMinus} aria-label={`Restar a ${name}`}>−</button>
        <button className="team-btn plus" type="button" onClick={onPlus} aria-label={`Sumar a ${name}`}>+</button>
      </div>
    </div>
  )
}
