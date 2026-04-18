import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Juego 5\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Juego5({ onBack }: Props) {
  return <BaseScorer label="Juego 5" emoji="🎲" rulesContent={RULES} onBack={onBack} />
}
