import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Sorteo\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Sorteo({ onBack }: Props) {
  return <BaseScorer label="Sorteo" emoji="🎰" rulesContent={RULES} onBack={onBack} />
}
