import { useState } from 'react'
import { useDataContext } from '../providers/DataProvider'
import { useModalContext } from '../providers/ModalProvider'
import { clearGrid } from '../../services/gridService'
import { useToastContext } from '../providers/ToastProvider'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function ClearModal() {
  const { fetchGrids } = useDataContext()
  const [choice, setChoice] = useState(null)
  const [loading, setLoading] = useState(false)
  const { gridToClear } = useModalContext()
  const { showToast } = useToastContext()
  const { token } = useAuthContext()

  const handleClickClear = async () => {
    if (!choice) {
      alert('Please choose an option.')
      return
    }

    setLoading(true)

    try {
      const response = await clearGrid(gridToClear, choice, token)
      setLoading(false)
      document.getElementById('clear_modal').close()
      showToast(response.message)
      fetchGrids()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickInput = (event) => {
    setChoice(event.target.value)
  }

  const handleClickExit = () => {
    setChoice(null)
  }

  return (
    <dialog id="clear_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl"
            onClick={handleClickExit}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">What Do You Want Cleared?</h3>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mb-3">
          <legend className="fieldset-legend">Choose an option</legend>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <label className="label">
              <input
                type="radio"
                name="clear-radio-1"
                className="radio"
                value="Clear check marks"
                checked={choice === 'Clear check marks'}
                onChange={handleClickInput}
              />
              Clear check marks
            </label>
            <label className="label">
              <input
                type="radio"
                name="clear-radio-1"
                className="radio"
                value="Clear all pillars & tasks"
                checked={choice === 'Clear all pillars & tasks'}
                onChange={handleClickInput}
              />
              Clear all pillars & tasks
            </label>
          </div>
        </fieldset>
        <div className="modal-action">
          {!loading ? (
            <button className="btn btn-warning" onClick={handleClickClear}>
              Clear
            </button>
          ) : (
            <button className="btn btn-warning">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Clearing grid...
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
