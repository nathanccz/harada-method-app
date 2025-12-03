import { useState } from 'react'
import { editGridDetails } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'

export default function EditDetailsModal({ gridToEdit, editDetails }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { fetchGrids } = useDataContext()

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value)
  }
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleClickSaveDetails = async () => {
    console.log(gridToEdit, title, description)
    const response = await editDetails(title, description)
    fetchGrids()
  }
  return (
    <dialog id="edit_details_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Short description"
            onChange={handleDescriptionInputChange}
          />
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
