import { Icon } from '@iconify/react'

export default function NewGridButton({ text, openCreateModal }) {
  return (
    <button className="btn btn-success" onClick={openCreateModal}>
      <Icon icon="qlementine-icons:new-24" className="text-xl" /> {text}
    </button>
  )
}
