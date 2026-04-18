import './App.css'

export default function App() {
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
        <button className="menu-btn" type="button">
          <div className="btn-img juegos-img">
            <span className="btn-emoji">🃏</span>
          </div>
          <span className="btn-label">Juegos</span>
        </button>
        <button className="menu-btn" type="button">
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
