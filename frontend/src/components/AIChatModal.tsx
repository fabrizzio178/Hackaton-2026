import { useState, useEffect, useRef } from 'react'
import './Modal.css'

const API_URL = 'http://localhost:8080/api/ai/chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatModalProps {
  onClose: () => void
}

export function AIChatModal({ onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu Mozo Virtual 🤖🍺 ¿Cuál es tu duda sobre las reglas?',
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus al input al abrir
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300)
  }, [])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isStreaming) return

    const userMsg: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)

    // Placeholder del asistente que vamos a ir llenando con el stream
    const assistantPlaceholder: Message = { role: 'assistant', content: '' }
    setMessages([...updatedMessages, assistantPlaceholder])

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Gemini exige que el historial empiece con 'user', así que
          // filtramos los mensajes del asistente que van antes del primer user
          messages: updatedMessages
            .filter((_, i, arr) => {
              const firstUserIdx = arr.findIndex(m => m.role === 'user')
              return i >= firstUserIdx
            })
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      if (!response.ok || !response.body) {
        throw new Error(`Error ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })

        // Actualizamos el último mensaje (el del asistente) en tiempo real
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: accumulated }
          return copy
        })
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = {
            role: 'assistant',
            content: '❌ Ups, no pude conectarme. Probá de nuevo en un momento.',
          }
          return copy
        })
      }
    } finally {
      setIsStreaming(false)
      abortRef.current = null
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage()
  }

  function handleClose() {
    abortRef.current?.abort()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-sheet chat-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <span className="chat-avatar">🤖</span>
            <div>
              <p className="chat-header-name">Mozo Virtual</p>
              <p className="chat-header-status">
                {isStreaming ? (
                  <span className="chat-typing">escribiendo<span className="dots">...</span></span>
                ) : (
                  <span className="chat-online">● En línea</span>
                )}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose} type="button">✕</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <span className="chat-bubble-avatar">🤖</span>
              )}
              <div className={`chat-bubble ${msg.role}`}>
                {msg.content || (isStreaming && i === messages.length - 1 ? (
                  <span className="chat-cursor">▌</span>
                ) : null)}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Escribí tu duda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            maxLength={500}
          />
          <button
            className="chat-send-btn"
            type="button"
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            aria-label="Enviar"
          >
            {isStreaming ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  )
}
