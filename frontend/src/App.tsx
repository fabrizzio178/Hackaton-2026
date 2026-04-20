import { useState, useRef } from 'react'
import './App.css'
import imgJuegos from './assets/Juego.png'
import imgCarta from './assets/Carta.png'
import imgJonjo from './assets/jonjo.jpg'
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
import { GlobalRulesModal } from './components/GlobalRulesModal'
import { useJuegos, useLandingData } from './hooks/useApi'
import { Skeleton } from './components/Skeleton'

type Screen = 'landing' | 'main'
type Tab = 'juegos' | 'carta'

const GAME_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  truco: Truco,
  poker: Poker,
  ajedrez: Ajedrez,
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
  const { juegos, loading } = useJuegos();
  
  if (activeJuego) {
    const GameComponent = GAME_COMPONENTS[activeJuego]
    if (GameComponent) return <GameComponent onBack={onBack} />
    return <div className="juegos-section"><p style={{color: 'white', textAlign: 'center'}}>Juego no disponible</p><button onClick={onBack} className="qty-btn" style={{margin:'0 auto', display:'block', width: '100px'}}>Volver</button></div>
  }

  if (loading) {
    return (
      <div className="juegos-section">
        <div className="juegos-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <Skeleton key={n} type="btn" />
          ))}
        </div>
      </div>
    )
  }

  const mappedJuegos = juegos.map(j => ({ ...j, id: j.nombre.toLowerCase().replace(' ', '') }));
  const gridJuegos = mappedJuegos.slice(0, 6)
  const extraJuegos = mappedJuegos.slice(6)

  return (
    <div className="juegos-section">
      <div className="juegos-grid">
        {gridJuegos.map((j) => (
          <button
            key={j.id}
            className={`juego-btn ${j.soon ? 'soon' : ''}`}
            type="button"
            disabled={j.soon}
            onClick={() => !j.soon && onSelect(j.id)}
          >
            <span className="juego-emoji">{j.emoji}</span>
            <span className="juego-label">{j.nombre}</span>
            {j.soon && <span className="juego-soon-badge">Próximamente</span>}
          </button>
        ))}
      </div>
      <div className="juegos-extra">
        {extraJuegos.map((j) => (
          <button
            key={j.id}
            className={`juego-extra-btn ${j.soon ? 'soon' : ''}`}
            type="button"
            disabled={j.soon}
            onClick={() => !j.soon && onSelect(j.id)}
          >
            <span className="juego-extra-emoji">{j.emoji}</span>
            <span className="juego-extra-label">{j.soon ? 'Próximo' : j.nombre}</span>
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
  const [rulesOpen, setRulesOpen] = useState(false)

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
        onOpenRules={() => setRulesOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />
      {rulesOpen && <GlobalRulesModal onClose={() => setRulesOpen(false)} />}
      {chatOpen && <AIChatModal onClose={() => setChatOpen(false)} />}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

function LandingPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { mesa, mozo, loading } = useLandingData();

  return (
    <main className="app">
      <header className="app-header">
        <h1 className="title">
          Bienvenido a<br />
          <span className="bar-name">Barcatón</span>
        </h1>
        {loading ? (
             <Skeleton type="rect" width={100} height={32} className="mesa-badge" style={{ padding: 0 }} />
        ) : (
           <div className="mesa-badge">Mesa {mesa?.numero || '10'}</div>
        )}
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
          {loading ? (
            <Skeleton type="circle" width={48} height={48} className="bartender-photo" style={{ border: 'none' }} />
          ) : (
            <div
              className="bartender-photo"
              style={{ backgroundImage: `url(${imgJonjo})` }}
            />
          )}
          {loading ? (
             <Skeleton type="text" width={140} style={{ marginLeft: 10, marginTop: 5 }} />
          ) : (
             <span className="bartender-name">{mozo ? `${mozo.nombre} ${mozo.apellido}` : 'Juan Jose Alonso'}</span>
          )}
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
