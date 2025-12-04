export default function EditListModal() {
  return (
    <dialog id="edit_list_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Grid Cells</h3>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-5">
          <legend className="fieldset-legend">Grid cells</legend>

          <label className="label">Main Goal</label>
          <input
            type="text"
            className="input w-full"
            placeholder="New grid title"
          />

          <label className="label">Tasks</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Short description"
          />
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Save Details</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
