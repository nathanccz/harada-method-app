export default function TemplateConfirmationModal() {
  return (
    <dialog id="template_confirmation_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Use Template?</h3>
        <p className="py-4">
          This will create a new project in your grids collection. You'll be
          able to edit or change any part of this grid once it's in your
          collection.
        </p>
        <div className="flex justify-end">
          <button className="btn btn-primary">Proceed</button>
        </div>
      </div>
    </dialog>
  )
}
