import { useEffect, useState } from 'react'
import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'

export default function EditCellModal({ gridToEdit, cellToEdit, cellText }) {
  const [content, setContent] = useState('')
  const { grids, fetchGrids } = useDataContext()
  const { showToast } = useToastContext()

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
    const data = grids.filter((grid) => grid._id === gridToEdit)[0]

    const gridIndex = data.grids.findIndex((grid) =>
      grid.some((cell) => cell.id === cellToEdit)
    )

    const taskIndex = data.grids[gridIndex].findIndex(
      (cell) => cell.id === cellToEdit
    )

    const copy = { ...data }
    copy.grids[gridIndex][taskIndex].text = content

    const response = await editGridCell(data._id, copy.grids)

    if (!response) {
      console.log('Something went wrong')
      return
    } else {
      console.log(response)
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
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClickExit}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3">Edit cell</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={handleFormChange}
          value={content ?? ''}
        />
        <button className="btn btn-success ml-3" onClick={handleClickSave}>
          Save
        </button>
      </div>
    </dialog>
  )
}
