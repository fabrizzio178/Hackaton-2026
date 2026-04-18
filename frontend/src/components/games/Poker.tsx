import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Poker\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Poker({ onBack }: Props) {
  return <BaseScorer label="Poker" emoji="♠️" rulesContent={RULES} onBack={onBack} />
}
