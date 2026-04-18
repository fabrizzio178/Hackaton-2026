import './Modal.css'

interface RulesModalProps {
  content: string
  onClose: () => void
}

export function RulesModal({ content, onClose }: RulesModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">✕</button>
        <div className="modal-body rules-body">
          <pre className="rules-content">{content}</pre>
        </div>
      </div>
    </div>
  )
}
