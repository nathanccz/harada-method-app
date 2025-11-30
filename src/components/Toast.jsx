export default function Toast({ text }) {
  return (
    <div className="toast toast-start">
      <div className="alert alert-success">
        <span>{text}</span>
      </div>
    </div>
  )
}
