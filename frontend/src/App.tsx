import { useState, useRef } from 'react'
import './App.css'
import CartaSection from './components/CartaSection/CartaSection'
import CartFab from './components/CartFab/CartFab'
import CartDrawer from './components/CartDrawer/CartDrawer'

type Screen = 'landing' | 'main'
type Tab = 'juegos' | 'carta'

const JUEGOS = [
  { id: 'truco',  label: 'Truco',   emoji: '🃏' },
  { id: 'poker',  label: 'Poker',   emoji: '♠️' },
  { id: 'juego3', label: 'Juego 3', emoji: '🎲' },
  { id: 'juego4', label: 'Juego 4', emoji: '🎲' },
  { id: 'juego5', label: 'Juego 5', emoji: '🎲' },
  { id: 'juego6', label: 'Juego 6', emoji: '🎲' },
]

function JuegosSection() {
  return (
    <div className="juegos-grid">
      {JUEGOS.map((j) => (
        <button key={j.id} className="juego-btn" type="button">
          <span className="juego-emoji">{j.emoji}</span>
          <span className="juego-label">{j.label}</span>
        </button>
      ))}
    </div>
  )
}

function TabContent({ tab, direction }: { tab: Tab; direction: 'left' | 'right' }) {
  return (
    <div className={`tab-content slide-${direction}`}>
      {tab === 'juegos' ? <JuegosSection /> : <CartaSection />}
    </div>
  )
}

function BottomNav({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (t: Tab) => void }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${activeTab === 'juegos' ? 'active' : ''}`}
        onClick={() => onTabChange('juegos')}
        type="button"
      >
        <span className="nav-emoji">🃏</span>
        <span className="nav-label">Juegos</span>
      </button>
      <button
        className={`nav-btn ${activeTab === 'carta' ? 'active' : ''}`}
        onClick={() => onTabChange('carta')}
        type="button"
      >
        <span className="nav-emoji">🍹</span>
        <span className="nav-label">Carta</span>
      </button>
    </nav>
  )
}

function MainPage({ initialTab }: { initialTab: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const prevTab = useRef<Tab>(initialTab)

  function handleTabChange(tab: Tab) {
    if (tab === activeTab) return
    setDirection(tab === 'carta' ? 'left' : 'right')
    prevTab.current = activeTab
    setActiveTab(tab)
  }

  return (
    <div className="main-page">
      <TabContent key={activeTab} tab={activeTab} direction={direction} />
      <CartFab onClick={() => setDrawerOpen(true)} />
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

function LandingPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <main className="app">
      <header className="app-header">
        <h1 className="title">
          Bienvenido a<br />
          <span className="bar-name">[Nombre del Bar]</span>
        </h1>
        <div className="mesa-badge">Mesa X</div>
      </header>

      <section className="menu-buttons">
        <button className="menu-btn" type="button" onClick={() => onNavigate('juegos')}>
          <div className="btn-img juegos-img">
            <span className="btn-emoji">🃏</span>
          </div>
          <span className="btn-label">Juegos</span>
        </button>
        <button className="menu-btn" type="button" onClick={() => onNavigate('carta')}>
          <div className="btn-img carta-img">
            <span className="btn-emoji">🍹</span>
          </div>
          <span className="btn-label">Carta</span>
        </button>
      </section>

      <footer className="footer">
        <div className="footer-divider" />
        <p className="footer-text">Hoy serás atendido por:</p>
        <div className="bartender">
          <div className="bartender-photo">
            <span className="bartender-initial">?</span>
          </div>
          <span className="bartender-name">[Nombre]</span>
        </div>
      </footer>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [initialTab, setInitialTab] = useState<Tab>('juegos')

  function handleNavigate(tab: Tab) {
    setInitialTab(tab)
    setScreen('main')
  }

  if (screen === 'main') {
    return <MainPage initialTab={initialTab} />
  }

  return <LandingPage onNavigate={handleNavigate} />
}
