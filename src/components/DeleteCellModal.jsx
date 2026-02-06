import { useState } from 'react'

export default function DeleteModal({ gridData }) {
  const [loading, setLoading] = useState(false)

  const handleClickConfirm = async () => {
    // setLoading(true)
  }

  return (
    <dialog id="delete_cell_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Are You Sure?</h3>
        <p className="py-4">
          This will permanently delete the cell, along with any notes and
          completion history.
        </p>
        <div className="flex justify-end">
          {!loading ? (
            <button className="btn btn-error" onClick={handleClickConfirm}>
              Confirm
            </button>
          ) : (
            <button className="btn btn-error">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Deleting
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
