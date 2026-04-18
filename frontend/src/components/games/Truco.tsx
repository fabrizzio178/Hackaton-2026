import { BaseScorer } from './BaseScorer'
import { TrucoTool } from './TrucoTool'

const RULES = `# Reglas del Truco Argentino

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
Se juegan 3 manos. Quien gane 2 de las 3 manos gana la ronda. Si hay empate en la primera, gana quien gane la segunda.
`

interface Props { onBack: () => void }

export function Truco({ onBack }: Props) {
  return (
    <BaseScorer label="Truco" emoji="🃏" rulesContent={RULES} onBack={onBack}>
      <TrucoTool />
    </BaseScorer>
  )
}
