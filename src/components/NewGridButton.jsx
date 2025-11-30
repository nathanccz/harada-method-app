export default function NewGridButton({ text, openCreateModal }) {
  return (
    <button className="btn btn-primary" onClick={openCreateModal}>
      {text}
    </button>
  )
}
