import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Modal.css';
import './GlobalRulesModal.css';

const RULES_TRUCO = `# Truco Argentino

El Truco es un juego de cartas con baraja española (40 cartas). El objetivo es llegar a 15 o 30 puntos.

## 1. Jerarquía de las Cartas (de mayor a menor)
1. **1 de Espada** (El Ancho de Espada)
2. **1 de Basto** (El Ancho de Basto)
3. **7 de Espada**
4. **7 de Oro**
5. **Todos los 3**
6. **Todos los 2**
7. **1 de Copa y 1 de Oro** (Anchos Falsos)
8. **Todos los 12** (Figuras)
9. **Todos los 11** (Figuras)
10. **Todos los 10** (Figuras)
11. **7 de Copa y 7 de Basto** (Sietes Falsos)
12. **Todos los 6**
13. **Todos los 5**
14. **Todos los 4**

## 2. El Envido
Se juega cuando se tienen dos cartas del mismo palo. Los puntos se calculan sumando el valor de las cartas más 20. Las figuras (10, 11, 12) valen 0 para la suma.
- **Puntos:** Envido (2), Real Envido (3), Falta Envido (los puntos que le faltan para ganar al que va ganando).

## 3. El Truco
Es el desafío sobre las cartas jugadas en las tres rondas.
- **Truco:** 2 puntos.
- **Retruco:** 3 puntos.
- **Vale 4:** 4 puntos.

## 4. Dinámica
Se juegan 3 manos. Quien gane 2 de las 3 manos gana la ronda. Si hay empate en la primera, gana quien gane la segunda.`;

const RULES_CHINCHON = `# Chinchón

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
- Al llegar a 100 puntos quedás eliminado (o pagás enganche).`;

const RULES_AJEDREZ = `# Ajedrez

El ajedrez es un juego de estrategia para dos jugadores que se juega en un tablero cuadriculado. El objetivo final es acorralar al rey del oponente de tal manera que no pueda evitar ser capturado, lo que se conoce como **Jaque Mate**.

### 1. El Tablero y la Disposición Inicial
El tablero consta de 64 casillas dispuestas en una cuadrícula de 8x8. 
* **Orientación del tablero:** El tablero debe colocarse de modo que cada jugador tenga una **casilla de color claro en su esquina inferior derecha**.
* **Las blancas siempre mueven primero.**

### 2. El Movimiento de las Piezas
* **El Peón:** Hacia adelante, captura en diagonal.
* **El Caballo:** En forma de "L". Salta piezas.
* **El Alfil:** En línea recta diagonal.
* **La Torre:** Horizontal o vertical.
* **La Reina:** En cualquier dirección recta.
* **El Rey:** Una casilla en cualquier dirección.

### 3. Movimientos Especiales
* **La Coronación:** Peón que llega al final se transforma.
* **El Enroque:** Movimiento especial conjunto del Rey y una Torre.

### 4. Jaque y Jaque Mate
* **Jaque:** Rey atacado directamente. Es obligatorio escapar.
* **Jaque Mate:** El rey está atacado sin escapatoria. Termina el juego.`;

const RULES_POKER = `# Poker — Texas Hold'em

## Dinámica de una mano

1. **Blinds** — El jugador a la izquierda del dealer pone el small blind; el siguiente pone el big blind.
2. **Pre-flop** — Cada jugador recibe 2 cartas privadas. Ronda de apuestas.
3. **Flop** — Se revelan 3 cartas comunitarias. Ronda de apuestas.
4. **Turn** — Se revela 1 carta más. Ronda de apuestas.
5. **River** — Se revela la última carta. Ronda de apuestas final.
6. **Showdown** — Quien quedó en juego muestra sus cartas. Gana la mejor mano de 5 cartas.

## Manos (de mayor a menor)

1. **Escalera Real**: A-K-Q-J-10 mismo palo.
2. **Escalera de Color**: 5 consecutivas mismo palo.
3. **Póker**: 4 del mismo valor.
4. **Full House**: Trío + Par.
5. **Color**: 5 del mismo palo.
6. **Escalera**: 5 consecutivas (distinto palo).
7. **Trío**: 3 del mismo valor.
8. **Doble Par**: 2 pares.
9. **Par**: 2 cartas del mismo valor.
10. **Carta Alta**: Ninguna.`;

const RULES_DB = [
  { id: 'truco', name: 'Truco', emoji: '🃏', content: RULES_TRUCO },
  { id: 'chinchon', name: 'Chinchón', emoji: '🎴', content: RULES_CHINCHON },
  { id: 'ajedrez', name: 'Ajedrez', emoji: '♟️', content: RULES_AJEDREZ },
  { id: 'poker', name: 'Poker', emoji: '♠️', content: RULES_POKER },
];

export function GlobalRulesModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(RULES_DB[0].id);
  const activeContent = RULES_DB.find(r => r.id === activeTab)?.content || '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet rules-sheet rules-global-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} type="button">✕</button>
        
        <div className="rules-tabs">
          {RULES_DB.map(r => (
            <button
              key={r.id}
              className={`rules-tab-btn ${activeTab === r.id ? 'active' : ''}`}
              onClick={() => setActiveTab(r.id)}
              type="button"
            >
              <span className="tab-emoji">{r.emoji}</span>
              <span className="tab-name">{r.name}</span>
            </button>
          ))}
        </div>

        <div className="modal-body rules-body global-rules-body">
          <div className="rules-md">
            <ReactMarkdown>{activeContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
