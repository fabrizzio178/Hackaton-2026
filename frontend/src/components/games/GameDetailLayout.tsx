import { type ReactNode } from 'react'
import { GameMenuDropdown } from './GameMenuDropdown'

interface GameDetailLayoutProps {
  children: ReactNode
  title: string
  onBack: () => void
  onOpenRules: () => void
}

export function GameDetailLayout({ children, title, onBack, onOpenRules }: GameDetailLayoutProps) {
  return (
    <div className="gdl">
      {/* Header fijo */}
      <header className="gdl__header">
        <button className="gdl__back" onClick={onBack} type="button" aria-label="Volver">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <h1 className="gdl__title">{title}</h1>

        <GameMenuDropdown onOpenRules={onOpenRules} />
      </header>

      {/* Body scrolleable con pb-24 crítico */}
      <main className="gdl__body">
        {children}
      </main>
    </div>
  )
}
