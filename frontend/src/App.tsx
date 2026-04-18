import { useState, useRef } from 'react'
import './App.css'
import imgJuegos from './assets/Juego.png'
import imgCarta from './assets/Carta.png'
import { Truco } from './components/games/Truco'
import { Poker } from './components/games/Poker'
import { Ajedrez } from './components/games/Ajedrez'
import { Juego4 } from './components/games/Juego4'
import { Juego5 } from './components/games/Juego5'
import { Juego6 } from './components/games/Juego6'
import { Dados } from './components/games/Dados'
import { Sorteo } from './components/games/Sorteo'
import CartaSection from './components/CartaSection/CartaSection'
import CartFab from './components/CartFab/CartFab'
import CartDrawer from './components/CartDrawer/CartDrawer'
import { AIChatModal } from './components/AIChatModal'
import { ActionMenu } from './components/ActionMenu'

type Screen = 'landing' | 'main'
type Tab = 'juegos' | 'carta'

const JUEGOS = [
  { id: 'truco', label: 'Truco', emoji: '🃏' },
  { id: 'poker', label: 'Poker', emoji: '♠️' },
  { id: 'juego3', label: 'Ajedrez', emoji: '♟️' },
  { id: 'juego4', label: 'Juego 4', emoji: '🎲' },
  { id: 'juego5', label: 'Juego 5', emoji: '🎲' },
  { id: 'juego6', label: 'Juego 6', emoji: '🎲' },
  { id: 'dados', label: 'Dados', emoji: '🎯' },
  { id: 'sorteo', label: 'Sorteo', emoji: '🎰' },
]

const GRID_JUEGOS = JUEGOS.slice(0, 6)
const EXTRA_JUEGOS = JUEGOS.slice(6)

const GAME_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  truco: Truco,
  poker: Poker,
  juego3: Ajedrez,
  juego4: Juego4,
  juego5: Juego5,
  juego6: Juego6,
  dados: Dados,
  sorteo: Sorteo,
}

function JuegosSection({
  activeJuego,
  onSelect,
  onBack,
}: {
  activeJuego: string | null
  onSelect: (id: string) => void
  onBack: () => void
}) {
  if (activeJuego) {
    const GameComponent = GAME_COMPONENTS[activeJuego]
    return <GameComponent onBack={onBack} />
  }
  return (
    <div className="juegos-section">
      <div className="juegos-grid">
        {GRID_JUEGOS.map((j) => (
          <button key={j.id} className="juego-btn" type="button" onClick={() => onSelect(j.id)}>
            <span className="juego-emoji">{j.emoji}</span>
            <span className="juego-label">{j.label}</span>
          </button>
        ))}
      </div>
      <div className="juegos-extra">
        {EXTRA_JUEGOS.map((j) => (
          <button key={j.id} className="juego-extra-btn" type="button" onClick={() => onSelect(j.id)}>
            <span className="juego-extra-emoji">{j.emoji}</span>
            <span className="juego-extra-label">{j.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function TabContent({
  tab,
  direction,
  activeJuego,
  onSelectJuego,
  onBackJuego,
}: {
  tab: Tab
  direction: 'left' | 'right'
  activeJuego: string | null
  onSelectJuego: (id: string) => void
  onBackJuego: () => void
}) {
  return (
    <div className={`tab-content slide-${direction}`}>
      {tab === 'juegos' ? (
        <JuegosSection activeJuego={activeJuego} onSelect={onSelectJuego} onBack={onBackJuego} />
      ) : (
        <CartaSection />
      )}
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
  const [activeJuego, setActiveJuego] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const prevTab = useRef<Tab>(initialTab)

  function handleTabChange(tab: Tab) {
    if (tab === activeTab) return
    setDirection(tab === 'carta' ? 'left' : 'right')
    prevTab.current = activeTab
    setActiveTab(tab)
  }

  return (
    <div className="main-page">
      <TabContent
        key={activeTab}
        tab={activeTab}
        direction={direction}
        activeJuego={activeJuego}
        onSelectJuego={setActiveJuego}
        onBackJuego={() => setActiveJuego(null)}
      />
      <CartFab onClick={() => setDrawerOpen(true)} />
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ActionMenu
        onOpenRules={() => {}}
        onOpenChat={() => setChatOpen(true)}
      />
      {chatOpen && <AIChatModal onClose={() => setChatOpen(false)} />}
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
          <span className="bar-name">Barcatón</span>
        </h1>
        <div className="mesa-badge">Mesa 10</div>
      </header>

      <section className="menu-buttons">
        <button className="menu-btn" type="button" onClick={() => onNavigate('juegos')}>
          <div className="btn-img">
            <img src={imgJuegos} alt="Juegos" className="btn-photo" />
          </div>
          <span className="btn-label">Juegos</span>
        </button>
        <button className="menu-btn" type="button" onClick={() => onNavigate('carta')}>
          <div className="btn-img">
            <img src={imgCarta} alt="Carta" className="btn-photo" />
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
          <span className="bartender-name">Juan Jose Alonso</span>
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
