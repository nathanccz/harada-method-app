import { useState } from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'
import { editGridCell } from '../../services/gridService'

export default function DeleteCellModal({ gridData, cellData }) {
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()
  const { showToast } = useToastContext()
  const { fetchGrids } = useDataContext()

  const handleClickConfirm = async () => {
    setLoading(true)

    const FIELDS_TO_DELETE = ['text', 'status', 'completedAt', 'notes']

    const gridArray = structuredClone(gridData.grids)
    const newCell = structuredClone(cellData)
    const targetPillar = gridArray.findIndex((pillar) =>
      pillar.some((cell) => cell.id === cellData.id)
    )
    const targetCell = gridArray[targetPillar].findIndex(
      (cell) => cell.id === cellData.id
    )

    for (const field of FIELDS_TO_DELETE) {
      newCell[field] = ''
    }

    gridArray[targetPillar][targetCell] = newCell

    try {
      const response = await editGridCell(gridData._id, gridArray, token)

      if (!response.message) {
        console.log('Something went wrong!')
      } else {
        setLoading(false)
        document.getElementById('delete_cell_modal').close()
        showToast(`Cell deleted!'`)
        fetchGrids()
      }
    } catch (error) {
      console.error(error)
    }
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
          This will permanently delete the cell, along with any notes, status
          and completion history.
        </p>
        <div className="flex justify-end">
          {!loading ? (
            <button className="btn btn-error" onClick={handleClickConfirm}>
              Confirm
            </button>
          ) : (
            <button className="btn btn-error">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Deleting...
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
