import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Juego 6\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Juego6({ onBack }: Props) {
  return <BaseScorer label="Juego 6" emoji="🎲" rulesContent={RULES} onBack={onBack} />
}
