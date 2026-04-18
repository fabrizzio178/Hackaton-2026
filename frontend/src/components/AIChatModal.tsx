import './Modal.css'

interface AIChatModalProps {
  onClose: () => void
}

export function AIChatModal({ onClose }: AIChatModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">✕</button>
        <div className="modal-body chat-body">
          <p className="chat-placeholder">Implementar chat IA</p>
        </div>
      </div>
    </div>
  )
}
