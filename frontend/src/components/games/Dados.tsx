import { BaseScorer } from './BaseScorer'

const RULES = `# Reglas de Dados\n\n(placeholder — reemplazar con el archivo .md correspondiente)`

interface Props { onBack: () => void }

export function Dados({ onBack }: Props) {
  return <BaseScorer label="Dados" emoji="🎯" rulesContent={RULES} onBack={onBack} />
}
