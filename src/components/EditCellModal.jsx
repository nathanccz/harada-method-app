import { useEffect, useState } from 'react'
import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function EditCellModal({ gridToEdit, cellToEdit, cellText }) {
  const [content, setContent] = useState('')
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
    if (cellText === '') {
      alert('Please enter some text.')
      return
    }

    setLoading(true)

    const data = grids.find((grid) => grid._id === gridToEdit)

    const gridIndex = data.grids.findIndex((grid) =>
      grid.some((cell) => cell.id === cellToEdit)
    )

    const taskIndex = data.grids[gridIndex].findIndex(
      (cell) => cell.id === cellToEdit
    )

    const copy = structuredClone(data)
    copy.grids[gridIndex][taskIndex].text = content

    if (gridIndex === 4 && cellToEdit !== 'main-5') {
      copy.grids[taskIndex][4].text = content
    }

    if (cellToEdit.endsWith('-5') && !cellToEdit.startsWith('main')) {
      copy.grids[4][gridIndex].text = content
    }

    const response = await editGridCell(data._id, copy.grids, token)

    if (!response) {
      console.log('Something went wrong')
      return
    } else {
      setLoading(false)
      fetchGrids()
      showToast(response.message)
      setContent('')
      document.getElementById('task_modal').close()
    }
  }

  const getTitle = (cellToEdit) => {
    if (!cellToEdit) return ''

    if (cellToEdit === 'main-5') {
      return 'Edit Main Goal'
    } else if (cellToEdit.startsWith('main') && cellToEdit !== 'main-5') {
      const split = cellToEdit.split('-')
      const position = split[split.length - 1]

      return `Edit Pillar ${position < 5 ? position : position - 1}`
    } else if (cellToEdit.startsWith('outer')) {
      const split = cellToEdit.split('-')
      const gridIndex = Number(split[1])
      const taskIndex = Number(split[2])

      if (taskIndex === 5) {
        return `Edit Pillar ${gridIndex + 1}`
      } else {
        return 'Edit Action'
      }
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
        <h3 className="font-bold text-lg mb-3">{getTitle(cellToEdit)}</h3>
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
