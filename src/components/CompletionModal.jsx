import { useState } from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'
import { deleteGrid, markGridAsCompleted } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'

export default function CompletionModal({ completedGridId }) {
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { token } = useAuthContext()
  const { fetchGrids } = useDataContext()
  const { showToast } = useToastContext()

  const handleClickDeleteBtn = async () => {
    if (isSaving) return

    setIsDeleting(true)

    try {
      await deleteGrid(completedGridId, token)
      setIsDeleting(false)
      document.getElementById('completion_modal').close()
      fetchGrids()
    } catch (error) {
      alert('Something went wrong.')
      console.log(error)
    }
  }
  const handleClickSaveBtn = async () => {
    if (isDeleting) return

    setIsSaving(true)

    try {
      await markGridAsCompleted(completedGridId, token)
      setIsSaving(false)
      document.getElementById('completion_modal').close()
      fetchGrids()
      showToast('Grid successfully saved!')
    } catch (error) {
      alert('Something went wrong.')
      console.log(error)
    }
  }

  return (
    <dialog id="completion_modal" className="modal">
      <div className="modal-box p-6 md:p-12 bg-success text-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl text-center">Congratulations! 🎉</h3>
        <p className="py-4">
          You've completed this grid and made significant progress toward
          achieving your dream life.
        </p>
        <h3 className="font-bold text-lg text-center">What's Next?</h3>
        <p className="pb-4">
          You can either delete it or save it as completed in your history.
        </p>
        <div className="flex flex-col-reverse md:flex-row gap-2 justify-end">
          {!isDeleting ? (
            <button
              className="btn btn-error w-24 ml-auto"
              onClick={handleClickDeleteBtn}
            >
              Delete
            </button>
          ) : (
            <button className="btn btn-error">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Deleting
            </button>
          )}
          {!isSaving ? (
            <button className="btn btn-primary" onClick={handleClickSaveBtn}>
              Save as Completed
            </button>
          ) : (
            <button className="btn btn-primary">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Saving
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
