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
import { RulesModal } from './components/RulesModal'

type Screen = 'landing' | 'main'
type Tab = 'juegos' | 'carta'

const JUEGOS = [
  { id: 'truco',  label: 'Truco',   emoji: '🃏', soon: false },
  { id: 'poker',  label: 'Poker',   emoji: '♠️', soon: false },
  { id: 'juego3', label: 'Ajedrez', emoji: '♟️', soon: false },
  { id: 'juego4', label: 'Juego 4', emoji: '🎲', soon: true  },
  { id: 'juego5', label: 'Juego 5', emoji: '🎲', soon: true  },
  { id: 'juego6', label: 'Juego 6', emoji: '🎲', soon: true  },
  { id: 'dados',  label: 'Dados',   emoji: '🎯', soon: false },
  { id: 'sorteo', label: 'Sorteo',  emoji: '🎰', soon: true  },
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
          <button
            key={j.id}
            className={`juego-btn ${j.soon ? 'soon' : ''}`}
            type="button"
            disabled={j.soon}
            onClick={() => !j.soon && onSelect(j.id)}
          >
            <span className="juego-emoji">{j.emoji}</span>
            <span className="juego-label">{j.label}</span>
            {j.soon && <span className="juego-soon-badge">Próximamente</span>}
          </button>
        ))}
      </div>
      <div className="juegos-extra">
        {EXTRA_JUEGOS.map((j) => (
          <button
            key={j.id}
            className={`juego-extra-btn ${j.soon ? 'soon' : ''}`}
            type="button"
            disabled={j.soon}
            onClick={() => !j.soon && onSelect(j.id)}
          >
            <span className="juego-extra-emoji">{j.emoji}</span>
            <span className="juego-extra-label">{j.soon ? 'Próximo' : j.label}</span>
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

  const REGLAS_CONTENT = `# 📖 Reglas del Bar

## 🃏 Truco Argentino

**Mazo:** Español de 40 cartas (sin 8, 9 ni comodines).

**Objetivo:** Llegar a 15 o 30 puntos ganando el Envido y el Truco en cada mano.

### Jerarquía de cartas
1 As de Espada · 2 As de Basto · 3 Siete de Espada · 4 Siete de Oro · 5 Tres · 6 Dos · 7 Ases falsos · 8 Reyes · 9 Caballos · 10 Sotas · 11 Sietes falsos · 12 Seis · 13 Cinco · 14 Cuatro

### Envido
Sumá las dos cartas del mismo palo + 20. Las figuras valen 0. Sin cartas del mismo palo, tomás el valor más alto.

**Cantos:** Envido (2 pts), Real Envido (3 pts), Falta Envido (lo que falte para ganar).

### Truco
Mejor de 3 rondas. **Truco** (2 pts) → **Retruco** (3 pts) → **Vale 4** (4 pts). Rechazar da los puntos del nivel anterior al rival.

---

## 🎴 Chinchón

**Mazo:** Español de 50 cartas (1 al 12 + 2 comodines).

**Objetivo:** Formar combinaciones y no superar 100 puntos.

### Combinaciones
- **Escalera:** 3+ cartas consecutivas del mismo palo.
- **Pierna:** 3-4 cartas del mismo número, distinto palo.
- El comodín reemplaza cualquier carta.

### Cortar
Podés cortar cuando tus cartas sueltas suman **5 puntos o menos**.

### Puntuación
- Cartas sueltas suman puntos en contra (figuras = 10).
- Cortar sin cartas sueltas: **−10 puntos**.
- **Chinchón** (escalera de 7 del mismo palo): ganás la partida o −50 pts con comodín.
- Al llegar a 100 puntos quedás eliminado (o pagás enganche).
`
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
      {rulesOpen && <RulesModal content={REGLAS_CONTENT} onClose={() => setRulesOpen(false)} />}
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
          <div
            className="bartender-photo"
            style={{ backgroundImage: `url(${imgJonjo})` }}
          />
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
