import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import {
  formatDate,
  getBadgeClassName,
  getFullStatus,
  getStatusIcon,
  getTitle,
  timeSince,
} from '../../utils/helpers'
import { editGridCell } from '../../services/gridService'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'
import { useModalContext } from '../providers/ModalProvider'
import NotesModal from './NotesModal'
import DeleteCellModal from './DeleteCellModal'

export default function Drawer({ gridData, cellData }) {
  const [saving, setSaving] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)
  const [clearingStatus, setClearingStatus] = useState(false)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const { token } = useAuthContext()
  const { showToast } = useToastContext()
  const { fetchGrids } = useDataContext()
  const { openEditCellModal } = useModalContext()

  useEffect(() => {
    setNotes(cellData?.notes?.text || '')
    setStatus(cellData?.status)
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

  const handleClickSetStatus = async (str) => {
    if (!status) return
    if (!cellData.text) {
      alert('Please fill in an action before setting a status.')
      return
    }

    if (str === 'clear') {
      setClearingStatus(true)
    } else {
      setSavingStatus(true)
    }

    const gridArray = structuredClone(gridData.grids)
    const newCell = structuredClone(cellData)
    const targetPillar = gridArray.findIndex((pillar) =>
      pillar.some((cell) => cell.id === cellData.id)
    )
    const targetCell = gridArray[targetPillar].findIndex(
      (cell) => cell.id === cellData.id
    )

    if (str === 'clear') {
      newCell.status = ''
    } else {
      newCell.status = status
    }

    if (str === 'clear' && status === 'complete') {
      newCell.completedAt = ''
    } else if (str !== 'clear' && status === 'complete') {
      newCell.completedAt = new Date().toISOString()
    }

    gridArray[targetPillar][targetCell] = newCell

    try {
      const response = await editGridCell(gridData._id, gridArray, token)

      if (!response.message) {
        console.log('Something went wrong!')
      } else {
        setSavingStatus(false)
        setClearingStatus(false)
        showToast(`Status ${str === 'clear' ? 'cleared!' : 'saved!'}`)
        fetchGrids()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="drawer drawer-end z-9999">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-5"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col justify-between">
            <div
              className="flex justify-end items-center gap-1 cursor-pointer border rounded-2xl border-transparent hover:bg-accent ease-in-out duration-100 w-fit absolute top-3 right-3 p-1"
              onClick={() =>
                openEditCellModal(gridData._id, cellData.id, cellData.text)
              }
            >
              {' '}
              Edit {getTitle(cellData.id)}
              <Icon icon="tabler:edit" className="text-2xl" />
            </div>
            {/* Sidebar content here */}
            <div>
              <div className="mb-5 flex flex-col gap-2">
                <h1 className="text-xl font-bold mt-8 ">
                  {cellData.text || 'Untitled'}{' '}
                </h1>
                <div className={getBadgeClassName(cellData.id)}>
                  {getTitle(cellData.id)}
                </div>
              </div>
              {gridData?.gridType === 'project' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Current status</h3>
                  {cellData.completedAt || cellData.status ? (
                    <div className="mb-5 flex gap-2 items-center">
                      <Icon
                        icon={
                          getStatusIcon(cellData.status)?.icon ||
                          getStatusIcon('complete')?.icon
                        }
                        className={
                          'text-lg ' + getStatusIcon(cellData.status)?.class
                        }
                      />
                      {cellData.completedAt ? (
                        <span className="block font-bold">
                          Completed {timeSince(cellData.completedAt)}
                        </span>
                      ) : (
                        cellData.status && (
                          <span className="block font-bold">
                            {getFullStatus(cellData.status)}{' '}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <select
                      defaultValue="Set status"
                      className="select appearance-none mb-5"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option disabled={true}>Set status</option>
                      <option value="waiting">Waiting on someone</option>
                      <option value="thinking">Needs more thought</option>
                      <option value="blocked">Blocked</option>
                      <option value="important">Important</option>
                      <option value="complete">Complete</option>
                    </select>
                  )}
                  <div className="flex gap-3 justify-end">
                    {cellData.status && !clearingStatus && (
                      <button
                        className="flex-1 btn btn-neutral"
                        onClick={() => handleClickSetStatus('clear')}
                      >
                        <Icon icon="pajamas:clear" className="text-lg" /> Clear
                        status
                      </button>
                    )}
                    {clearingStatus && (
                      <button className="flex-1 btn btn-neutral">
                        <span className="loading loading-spinner loading-md"></span>{' '}
                        Clearing...
                      </button>
                    )}
                    {!savingStatus && !cellData.status ? (
                      <button
                        className="flex-1 btn btn-primary"
                        onClick={handleClickSetStatus}
                      >
                        <Icon
                          icon="fluent:status-12-filled"
                          className="text-lg"
                        />{' '}
                        Save status
                      </button>
                    ) : (
                      savingStatus &&
                      !cellData.status && (
                        <button className="flex-1 btn btn-success">
                          <span className="loading loading-spinner loading-md"></span>{' '}
                          Saving status...
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3 mt-5">
                <h3 className="text-lg font-bold">My notes</h3>
                <textarea
                  className="textarea h-64"
                  placeholder="Start typing here..."
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                ></textarea>
                {cellData?.notes?.lastModified && (
                  <span className="italic">
                    Last updated: {formatDate(cellData.notes.lastModified)}
                  </span>
                )}
                <div className="flex justify-around gap-3">
                  <button
                    className="flex-1 btn btn-neutral"
                    onClick={() =>
                      document.getElementById('notes_modal').showModal()
                    }
                  >
                    <Icon icon="carbon:view-filled" className="text-lg" /> View
                    Full
                  </button>
                  {!saving ? (
                    <button
                      className="btn btn-success"
                      onClick={handleClickSaveNotes}
                    >
                      <Icon icon="material-symbols:save" className="text-lg" />{' '}
                      Save Notes
                    </button>
                  ) : (
                    <button className="btn btn-success">
                      <span className="loading loading-spinner loading-md"></span>{' '}
                      Saving...
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button className="btn btn-error" onClick={handleClickDelete}>
              <Icon icon="tabler:trash" className="text-lg" /> Delete{' '}
              {getTitle(cellData.id)}
            </button>
          </ul>
        </div>
      </div>
      <NotesModal
        text={notes}
        saving={saving}
        setNotes={setNotes}
        handleClickSaveNotes={handleClickSaveNotes}
      />
      <DeleteCellModal gridData={gridData} cellData={cellData} />
    </>
  )
}
