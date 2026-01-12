import JsonDownloader from './JsonDownloader'
import { useDataContext } from '../providers/DataProvider'
import { useState } from 'react'

export default function DeleteModal({ removeGrid }) {
  const { fetchGrids } = useDataContext()
  const [loading, setLoading] = useState(false)

  const handleDeleteGrid = async (e) => {
    e.preventDefault()

    setLoading(true)
    const response = await removeGrid()
    setLoading(false)
    document.getElementById('delete_modal').close()
    fetchGrids()
  }
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
        <p className="py-4">
          This grid will be permanently deleted. You can save a JSON file to
          re-upload later in case you change your mind!
        </p>

        <div className="modal-action">
          <button className="btn btn-primary">
            <JsonDownloader />
          </button>
          {!loading ? (
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error" onClick={handleDeleteGrid}>
                Delete
              </button>
            </form>
          ) : (
            <button className="btn btn-error" onClick={handleDeleteGrid}>
              <span className="loading loading-spinner loading-md"></span>{' '}
              Deleting
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
