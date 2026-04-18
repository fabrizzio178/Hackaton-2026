import { BaseScorer } from './BaseScorer'
import { PokerTable } from './PokerTable'

const RULES = `# Poker — Texas Hold'em

## Cómo usar el contador
Configurá el número de jugadores y las fichas iniciales. Usá **+** / **−** para ajustar los stacks. El badge **D** indica el dealer; tocá **Siguiente mano** para rotarlo.

---

## Manos (de mayor a menor)

### 1. Escalera Real
A — K — Q — J — 10 del mismo palo. La mano más alta posible.

### 2. Escalera de Color
Cinco cartas consecutivas del mismo palo. Ejemplo: 7–8–9–10–J de corazones.

### 3. Póker (Four of a Kind)
Cuatro cartas del mismo valor. Ejemplo: 4 × Reinas.

### 4. Full House
Tres cartas del mismo valor + un par. Ejemplo: 3 × 9 y 2 × K.

### 5. Color (Flush)
Cinco cartas del mismo palo (no consecutivas).

### 6. Escalera (Straight)
Cinco cartas consecutivas de distintos palos. Ejemplo: 5–6–7–8–9.

### 7. Trío (Three of a Kind)
Tres cartas del mismo valor.

### 8. Doble Par
Dos pares distintos. Ejemplo: 2 × J y 2 × 4.

### 9. Par
Dos cartas del mismo valor.

### 10. Carta Alta
Ninguna combinación. Gana la carta más alta.

---

## Dinámica de una mano

1. **Blinds** — El jugador a la izquierda del dealer pone el small blind; el siguiente pone el big blind.
2. **Pre-flop** — Cada jugador recibe 2 cartas privadas. Ronda de apuestas.
3. **Flop** — Se revelan 3 cartas comunitarias. Ronda de apuestas.
4. **Turn** — Se revela 1 carta más. Ronda de apuestas.
5. **River** — Se revela la última carta. Ronda de apuestas final.
6. **Showdown** — Quien quedó en juego muestra sus cartas. Gana la mejor mano de 5 cartas (combinando las 2 privadas con las 5 comunitarias).

---

## Acciones en cada ronda

| Acción | Descripción |
|--------|-------------|
| **Check** | Pasar sin apostar (solo si nadie apostó antes) |
| **Bet / Raise** | Apostar o subir la apuesta |
| **Call** | Igualar la apuesta del oponente |
| **Fold** | Retirarse y perder las fichas apostadas |
| **All-in** | Apostar todas las fichas restantes |
`

interface Props { onBack: () => void }

export function Poker({ onBack }: Props) {
  return (
    <BaseScorer label="Poker" emoji="♠️" rulesContent={RULES} onBack={onBack}>
      <PokerTable />
    </BaseScorer>
  )
}
