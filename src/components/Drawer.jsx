import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { getTitle } from '../../utils/helpers'
import { editGridCell } from '../../services/gridService'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'

export default function Drawer({ gridData, cellData }) {
  const [saving, setSaving] = useState(false)
  const [notes, setNotes] = useState('')
  const { token } = useAuthContext()
  const { showToast } = useToastContext()
  const { fetchGrids } = useDataContext()

  useEffect(() => {
    setNotes(cellData?.notes?.text || '')
  }, [cellData])

  const handleClickDelete = () => {
    document.getElementById('delete_cell_modal').showModal()
  }

  const handleClickSaveNotes = async () => {
    setSaving(true)

    const gridArray = structuredClone(gridData.grids)
    const newCell = structuredClone(cellData)
    const targetPillar = gridArray.findIndex((pillar) =>
      pillar.some((cell) => cell.id === cellData.id)
    )
    const targetCell = gridArray[targetPillar].findIndex(
      (cell) => cell.id === cellData.id
    )

    if (!newCell.notes) {
      newCell.notes = {
        text: '',
        lastModified: '',
      }
    }

    newCell.notes.text = notes.trim()
    newCell.notes.lastModified = new Date().toISOString()

    gridArray[targetPillar][targetCell] = newCell

    try {
      const response = await editGridCell(gridData._id, gridArray, token)

      if (!response.message) {
        console.log('Something went wrong!')
      } else {
        setSaving(false)
        showToast('Note saved!')
        fetchGrids()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="drawer drawer-end z-9999">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <div className="flex justify-end cursor-pointer border rounded-2xl border-transparent hover:bg-accent ease-in-out duration-100 w-fit absolute top-3 right-3 p-1">
            <Icon icon="tabler:edit" className="text-2xl" />
          </div>
          {/* Sidebar content here */}
          <h1 className="text-xl font-bold mt-8 mb-3">
            {getTitle(cellData.id)}: "{cellData.text}"
          </h1>
          <div className="flex flex-col gap-3">
            <h3>Add Notes:</h3>
            <textarea
              className="textarea h-48"
              placeholder="Start typing here..."
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
            <div className="flex justify-around gap-3">
              <button className="flex-1 btn btn-neutral">
                <Icon icon="carbon:view-filled" className="text-lg" /> View Full
              </button>
              {!saving ? (
                <button
                  className="btn btn-success"
                  onClick={handleClickSaveNotes}
                >
                  <Icon icon="material-symbols:save" className="text-lg" /> Save
                  Notes
                </button>
              ) : (
                <button className="btn btn-success">
                  <span className="loading loading-spinner loading-md"></span>{' '}
                  Saving...
                </button>
              )}
            </div>
            <button className="btn btn-error" onClick={handleClickDelete}>
              <Icon icon="tabler:trash" className="text-lg" /> Delete{' '}
              {getTitle(cellData.id)}
            </button>
          </div>

          {/* <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li> */}
        </ul>
      </div>
    </div>
  )
}
