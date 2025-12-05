import { useDataContext } from '../providers/DataProvider'

export default function ClearModal({ clearGrid }) {
  const { fetchGrids } = useDataContext()
  const handleClickClear = async () => {
    try {
      const response = await clearGrid()
      fetchGrids()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <dialog id="clear_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Are You Sure?</h3>
        <p className="py-4">
          Your grid will be permanently deleted and removed from local storage.
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-warning" onClick={handleClickClear}>
              Clear
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
