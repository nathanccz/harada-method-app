import { Icon } from '@iconify/react'

export default function NotesModal({
  text,
  saving,
  setNotes,
  handleClickSaveNotes,
}) {
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
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <div className="mt-3 flex justify-end">
          {!saving ? (
            <button className="btn btn-success" onClick={handleClickSaveNotes}>
              <Icon icon="material-symbols:save" className="text-lg" /> Save
              Notes
            </button>
          ) : (
            <button className="btn btn-success">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Saving...
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
