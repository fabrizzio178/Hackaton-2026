import { useState } from 'react'
import { ActionMenu } from '../ActionMenu'
import { RulesModal } from '../RulesModal'
import { AIChatModal } from '../AIChatModal'
import '../../App.css'
import '../games/games.css'

interface BaseScorerProps {
  label: string
  emoji: string
  rulesContent: string
  onBack: () => void
  children?: React.ReactNode
  showTitle?: boolean
  fullHeight?: boolean
}

export function BaseScorer({ label, emoji, rulesContent, onBack, children, showTitle = true, fullHeight = false }: BaseScorerProps) {
  const [modal, setModal] = useState<'rules' | 'chat' | null>(null)

  return (
    <div className={`scorer-view${fullHeight ? ' scorer-full-height' : ''}`}>
      <button className="scorer-back-btn" onClick={onBack} type="button">←</button>

      <ActionMenu
        onOpenRules={() => setModal('rules')}
        onOpenChat={() => setModal('chat')}
      />

      {showTitle && (
        <div className="scorer-title">
          <span className="scorer-emoji">{emoji}</span>
          <h2 className="scorer-name">{label}</h2>
        </div>
      )}

      {children}

      {modal === 'rules' && (
        <RulesModal content={rulesContent} onClose={() => setModal(null)} />
      )}
      {modal === 'chat' && (
        <AIChatModal onClose={() => setModal(null)} />
      )}
    </div>
  )
}
