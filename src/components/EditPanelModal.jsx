export default function EditPanelModal() {
  return (
    <dialog id="edit_panel_modal" className="modal">
      <div className="modal-box text-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Let's Get Started!</h3>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-5">
          <legend className="fieldset-legend">New grid details</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="New grid title"
            onChange={handleTitleInputChange}
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Short description"
            onChange={handleDescriptionInputChange}
          />
        </fieldset>
        <div className="flex justify-end">
          <button
            className="btn btn-success ml-3"
            onClick={() => createProject(title, description)}
          >
            Create Grid
          </button>
        </div>
      </div>
    </dialog>
  )
}
