import { useState } from 'react'

export function GlobalRandomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)

  function getNames() {
    return input.split('\n').map(s => s.trim()).filter(Boolean)
  }

  function pickWinner() {
    const names = getNames()
    if (names.length === 0) { setResult('Ingresá al menos 1 nombre'); return }
    setResult(`🏆 Ganador: ${names[Math.floor(Math.random() * names.length)]}`)
  }

  function makeTeams() {
    const names = getNames()
    if (names.length < 2) { setResult('Ingresá al menos 2 nombres'); return }
    // Fisher-Yates
    const arr = [...names]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    const mid = Math.ceil(arr.length / 2)
    setResult(`⚔️ EQUIPO 1:\n${arr.slice(0, mid).join(', ')}\n\n🛡️ EQUIPO 2:\n${arr.slice(mid).join(', ')}`)
  }

  function close() { setIsOpen(false); setResult(null) }

  return (
    <>
      <button
        className="fab fab--random"
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Sorteador"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-card__title">Sorteador</h3>

            <textarea
              className="rand-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ingresá los nombres (uno por línea)…"
            />

            <div className="modal-actions" style={{ marginBottom: '1rem' }}>
              <button className="btn btn--primary" onClick={pickWinner} type="button">
                Sortear 1
              </button>
              <button className="btn btn--outline" onClick={makeTeams} type="button">
                Armar Equipos
              </button>
            </div>

            {result && <div className="rand-result">{result}</div>}

            <button className="btn btn--ghost btn--full" onClick={close} type="button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
