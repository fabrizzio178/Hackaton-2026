import { BaseScorer } from './BaseScorer'
import { PokerTable } from './PokerTable'

const RULES = `# Poker

## Fichas
Cada jugador comienza con el buy-in configurado.
Usá **+** / **−** para ajustar el stack según las apuestas.

## Bote
El bote muestra el total en juego.
Sumá o restá fichas con los botones del bote.

## Denominación
Seleccioná el valor de ficha activo (25 / 50 / 100 / 500) para que los botones + / − operen en ese monto.

## Repartidor
El badge **D** indica quién reparte.
Tocá **Siguiente mano** para rotar el dealer al finalizar cada mano.
`

interface Props { onBack: () => void }

export function Poker({ onBack }: Props) {
  return (
    <BaseScorer label="Poker" emoji="♠️" rulesContent={RULES} onBack={onBack}>
      <PokerTable />
    </BaseScorer>
  )
}
