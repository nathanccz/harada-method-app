export default function NotesModal({ text }) {
  return (
    <dialog id="notes_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3">Notes</h3>
        <textarea
          className="textarea w-full h-[30vh]"
          placeholder="Start typing here..."
          value={text}
        ></textarea>
      </div>
    </dialog>
  )
}
