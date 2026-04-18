import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Juego 4\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Juego4({ onBack }: Props) {
  return <BaseScorer label="Juego 4" emoji="🎲" rulesContent={RULES} onBack={onBack} />
}
