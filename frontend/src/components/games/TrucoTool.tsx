import { useState } from 'react'

// ─── Match colors ─────────────────────────────────────────────────────────────
const STICK  = '#b8762e'   // wooden stick
const STICK_DARK = '#8a541a'  // shadow side
const HEAD   = '#c0271a'   // red phosphorus head
const HEAD_GLOW = '#e03d2d' // highlight on head

// ─── SVG matchstick group: up to 5 fósforos (4 vertical + 1 diagonal) ────────
function TallyGroup({ filled }: { filled: number }) {
  const W  = 40
  const H  = 64
  const xs = [7, 16, 25, 34]   // x positions for 4 vertical sticks
  const HR = 4                  // head radius

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="tally-group"
      aria-hidden="true"
    >
      {/* ── Vertical matches ─────────────────────────────────────────── */}
      {xs.map((x, i) =>
        i < Math.min(filled, 4) ? (
          <g key={i}>
            {/* Wooden stick */}
            <line
              x1={x} y1={HR * 2 + 2}
              x2={x} y2={H - 4}
              stroke={STICK} strokeWidth="2.8" strokeLinecap="round"
            />
            {/* Shadow side of stick */}
            <line
              x1={x + 1} y1={HR * 2 + 4}
              x2={x + 1} y2={H - 6}
              stroke={STICK_DARK} strokeWidth="0.8" strokeLinecap="round"
              opacity={0.5}
            />
            {/* Red head */}
            <circle cx={x} cy={HR + 1} r={HR} fill={HEAD} />
            {/* Head highlight */}
            <circle cx={x - 1} cy={HR} r={HR * 0.45} fill={HEAD_GLOW} opacity={0.7} />
          </g>
        ) : null
      )}

      {/* ── 5th match — diagonal ─────────────────────────────────────── */}
      {filled >= 5 && (
        <g>
          {/* Wooden diagonal stick */}
          <line
            x1={W - 5} y1={H - 4}
            x2={5}     y2={HR * 2 + 1}
            stroke={STICK} strokeWidth="2.8" strokeLinecap="round"
          />
          {/* Red head at upper-left */}
          <circle cx={5} cy={HR + 1} r={HR} fill={HEAD} />
          <circle cx={4} cy={HR}     r={HR * 0.45} fill={HEAD_GLOW} opacity={0.7} />
        </g>
      )}
    </svg>
  )
}

// ─── One scoring half (max 15 pts = 3 groups of 5) ───────────────────────────
function TallySection({ score, offset }: { score: number; offset: number }) {
  const seg = Math.min(Math.max(score - offset, 0), 15)
  return (
    <div className="tally-section">
      {[0, 1, 2].map(g => (
        <TallyGroup key={g} filled={Math.min(Math.max(seg - g * 5, 0), 5)} />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function TrucoTool() {
  const [scoreUs,   setScoreUs]   = useState(0)
  const [scoreThem, setScoreThem] = useState(0)
  const [showHelp,  setShowHelp]  = useState(false)

  const update = (team: 'us' | 'them', delta: number) => {
    if (team === 'us')   setScoreUs(s   => Math.min(30, Math.max(0, s + delta)))
    else                 setScoreThem(s => Math.min(30, Math.max(0, s + delta)))
  }

  const reset = () => { setScoreUs(0); setScoreThem(0) }

  // Winner detection
  const winner: 'us' | 'them' | null =
    scoreUs   === 30 ? 'us'   :
    scoreThem === 30 ? 'them' : null

  // Helper: returns the right CSS modifier class for each cell
  const cellState = (team: 'us' | 'them') =>
    winner === null        ? ''
    : winner === team      ? 'truco__cell--winner'
    :                        'truco__cell--loser'

  return (
    <div className="truco">
      <div className="truco__board">

        {/* ── Row 1: team headers ───────────────────────────────────── */}
        <div className="truco__row truco__row--header">
          <div className={`truco__cell ${cellState('us')}`}>
            <div className="tally-team-wrap">
              <span className="tally-team">Nosotros</span>
              {winner === 'us' && <span className="tally-win-badge">🏆 ¡Ganó!</span>}
            </div>
          </div>
          <div className="truco__vert-div" />
          <div className={`truco__cell ${cellState('them')}`}>
            <div className="tally-team-wrap">
              <span className="tally-team">Ellos</span>
              {winner === 'them' && <span className="tally-win-badge">🏆 ¡Ganó!</span>}
            </div>
          </div>
        </div>

        {/* ── Gold divider under team names ─────────────────────────── */}
        <div className="truco__horiz-div" />

        {/* ── Row 2: matches 1–15 ───────────────────────────────────── */}
        <div className="truco__row truco__row--marks">
          <div className={`truco__cell ${cellState('us')}`}>
            <TallySection score={scoreUs}   offset={0} />
          </div>
          <div className="truco__vert-div" />
          <div className={`truco__cell ${cellState('them')}`}>
            <TallySection score={scoreThem} offset={0} />
          </div>
        </div>

        {/* ── Gold divider at 15 pts ────────────────────────────────── */}
        <div className="truco__horiz-div" />

        {/* ── Row 3: matches 16–30 ─────────────────────────────────── */}
        <div className="truco__row truco__row--marks">
          <div className={`truco__cell ${cellState('us')}`}>
            <TallySection score={scoreUs}   offset={15} />
          </div>
          <div className="truco__vert-div" />
          <div className={`truco__cell ${cellState('them')}`}>
            <TallySection score={scoreThem} offset={15} />
          </div>
        </div>

        {/* ── Row 4: controls ──────────────────────────────────────── */}
        <div className="truco__row truco__row--controls">
          <div className={`truco__cell truco__cell--controls ${cellState('us')}`}>
            <button
              className="truco__btn truco__btn--minus"
              onClick={() => update('us', -1)}
              type="button"
              aria-label="Restar punto Nosotros"
            >−</button>
            <span className="tally-score-num">{scoreUs}</span>
            <button
              className="truco__btn truco__btn--plus"
              onClick={() => update('us', 1)}
              type="button"
              aria-label="Sumar punto Nosotros"
            >+</button>
          </div>
          <div className="truco__vert-div" />
          <div className={`truco__cell truco__cell--controls ${cellState('them')}`}>
            <button
              className="truco__btn truco__btn--minus"
              onClick={() => update('them', -1)}
              type="button"
              aria-label="Restar punto Ellos"
            >−</button>
            <span className="tally-score-num">{scoreThem}</span>
            <button
              className="truco__btn truco__btn--plus"
              onClick={() => update('them', 1)}
              type="button"
              aria-label="Sumar punto Ellos"
            >+</button>
          </div>
        </div>

      </div>{/* /truco__board */}

      {/* ── Nueva partida button (visible only on game over) ─────────── */}
      {winner && (
        <button className="truco__reset-btn" onClick={reset} type="button">
          🔄 Nueva Partida
        </button>
      )}

      {/* ── Cheatsheet button ─────────────────────────────────────── */}
      <button
        className="truco__help-trigger"
        onClick={() => setShowHelp(true)}
        type="button"
      >
        Ver Valores de Cartas
      </button>

      {/* ── Cheatsheet modal ──────────────────────────────────────── */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '24rem', alignItems: 'stretch' }}
          >
            <button className="modal-card__close" onClick={() => setShowHelp(false)} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="modal-card__title">Valores para el Truco</h3>

            <div>
              <div className="truco-help__row"><span className="truco-help__card-name">1 de Espada</span> — La más alta</div>
              <div className="truco-help__row"><span className="truco-help__card-name">1 de Basto</span> — 2da</div>
              <div className="truco-help__row"><span className="truco-help__card-name">7 de Espada</span> — 3ra</div>
              <div className="truco-help__row"><span className="truco-help__card-name">7 de Oro</span> — 4ta</div>
              <div className="truco-help__row"><span className="truco-help__card-name">Los 3</span> — 5ta</div>
              <div className="truco-help__row"><span className="truco-help__card-name">Los 2</span> — 6ta</div>
              <div className="truco-help__row"><span className="truco-help__card-name">1 Copa / Oro</span> — 7ma</div>
              <div className="truco-help__row"><span className="truco-help__card-name">12, 11, 10</span> — Figuras</div>
              <div className="truco-help__row"><span className="truco-help__card-name">7 C/B, 6, 5, 4</span> — Las bajas</div>
            </div>

            <div className="truco-help__section">
              <p className="truco-help__section-title">Envido (Tantos)</p>
              <div className="truco-help__row">Flor: 3 cartas mismo palo (20 + suma)</div>
              <div className="truco-help__row">Envido: 2 cartas mismo palo (20 + suma)</div>
              <p className="truco-help__note">Figuras valen 0 para el tanto.</p>
            </div>

            <button
              className="btn btn--primary btn--full"
              onClick={() => setShowHelp(false)}
              type="button"
              style={{ marginTop: '1.25rem' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
