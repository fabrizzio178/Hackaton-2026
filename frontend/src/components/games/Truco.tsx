import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Truco\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Truco({ onBack }: Props) {
  return <BaseScorer label="Truco" emoji="🃏" rulesContent={RULES} onBack={onBack} />
}
