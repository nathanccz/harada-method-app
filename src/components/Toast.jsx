export default function Toast({ text }) {
  return (
    <div className="toast toast-start z-9999">
      <div className="alert alert-success">
        <span>{text}</span>
      </div>
    </div>
  )
}
