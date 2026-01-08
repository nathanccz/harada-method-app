import { use, useEffect, useState } from 'react'
import { editGridDetails } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { Icon } from '@iconify/react'
import { useToastContext } from '../providers/ToastProvider'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function EditDetailsModal({ gridToEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gridType, setGridType] = useState('')
  const { fetchGrids } = useDataContext()
  const { grids } = useDataContext()
  const { showToast } = useToastContext()
  const { token } = useAuthContext()
  const currentGrid = grids.filter((grid) => grid._id === gridToEdit)[0]

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value)
  }
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleClickSaveDetails = async () => {
    const response = await editGridDetails(
      currentGrid._id,
      title,
      description,
      gridType,
      token
    )
    setDescription('')
    setTitle('')
    fetchGrids()
    showToast('Grid updated!')
  }

  const handleClickInput = (event) => {
    setGridType(event.target.value)
  }

  useEffect(() => {
    setTitle(currentGrid?.title)
    setDescription(currentGrid?.description)
    setGridType(currentGrid?.gridType)
  }, [gridToEdit, grids])

  return (
    <dialog id="edit_details_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Grid Details</h3>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-5">
          <legend className="fieldset-legend">Grid details</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="New grid title"
            onChange={handleTitleInputChange}
            value={title ?? ''}
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Short description"
            onChange={handleDescriptionInputChange}
            value={description ?? ''}
          />
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mb-3">
          <legend className="fieldset-legend">Grid type</legend>
          <div className="flex gap-3 justify-center">
            <label className="label">
              <input
                type="radio"
                name="edit-radio-1"
                className="radio"
                value="ongoing"
                checked={gridType === 'ongoing'}
                onChange={handleClickInput}
              />
              Ongoing
            </label>
            <label className="label">
              <input
                type="radio"
                name="edit-radio-1" //NOTE: This attribute should be unique in each component where it's used, otherwise causes conflicts
                className="radio"
                value="project"
                checked={gridType === 'project'}
                onChange={handleClickInput}
              />
              Project-based
            </label>
            <div
              className="tooltip"
              data-tip="Project-based grids let you mark completed tasks and track progress."
            >
              <button className="btn">
                <Icon icon="ri:question-line" className="text-xl" />
              </button>
            </div>
          </div>
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handleClickSaveDetails}>
              Save Details
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
