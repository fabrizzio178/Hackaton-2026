import { type ReactNode } from 'react'

interface DropdownItemProps {
  label: string
  onClick: () => void
  icon?: ReactNode
}

export function DropdownItem({ label, onClick, icon }: DropdownItemProps) {
  return (
    <button className="ddi" onClick={onClick} type="button">
      {icon && <span className="ddi__icon">{icon}</span>}
      {label}
    </button>
  )
}
