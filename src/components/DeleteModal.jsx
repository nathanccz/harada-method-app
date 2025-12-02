export default function DeleteModal({ removeGrid }) {
  return (
    <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box text-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">This grid will be permanently deleted.</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={removeGrid}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
