import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Juego 3\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Juego3({ onBack }: Props) {
  return <BaseScorer label="Juego 3" emoji="🎲" rulesContent={RULES} onBack={onBack} />
}
