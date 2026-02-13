import { useEffect, useState } from 'react'
import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { getTitle } from '../../utils/helpers'

export default function EditCellModal({
  gridToEdit,
  cellToEdit,
  cellText,
  setCurrentCell,
}) {
  const [content, setContent] = useState(cellText)
  const [loading, setLoading] = useState(false)
  const { grids, fetchGrids } = useDataContext()
  const { showToast } = useToastContext()
  const { token } = useAuthContext()

  useEffect(() => {
    setContent(cellText)
  }, [gridToEdit, cellToEdit, cellText])

  const handleFormChange = (e) => {
    setContent(e.target.value)
  }

  const handleClickExit = () => {
    setContent('')
  }

  const handleClickSave = async () => {
    if (content === '') {
      alert('Please enter some text.')
      return
    }

    setLoading(true)

    const data = structuredClone(gridToEdit)

    const gridIndex = data.grids.findIndex((grid) =>
      grid.some((cell) => cell.id === cellToEdit)
    )

    const taskIndex = data.grids[gridIndex].findIndex(
      (cell) => cell.id === cellToEdit
    )

    data.grids[gridIndex][taskIndex].text = content

    if (gridIndex === 4 && cellToEdit !== 'main-5') {
      data.grids[taskIndex][4].text = content
    }

    if (cellToEdit.endsWith('-5') && !cellToEdit.startsWith('main')) {
      data.grids[4][gridIndex].text = content
    }

    const response = await editGridCell(data._id, data.grids, token)

    if (!response) {
      console.log('Something went wrong')
      return
    } else {
      setLoading(false)
      setCurrentCell(data.grids[gridIndex][taskIndex])
      fetchGrids()
      showToast(response.message)
      setContent('')
      document.getElementById('task_modal').close()
    }
  }

  return (
    <dialog id="task_modal" className="modal">
      <div className="modal-box p-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl"
            onClick={handleClickExit}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3">
          {'Edit' + ' ' + getTitle(cellToEdit)}
        </h3>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={handleFormChange}
          value={content ?? ''}
        />
        {!loading ? (
          <button className="btn btn-success ml-3" onClick={handleClickSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-success ml-3">
            <span className="loading loading-spinner loading-md"></span>
          </button>
        )}
      </div>
    </dialog>
  )
}
