import { useState } from 'react'
import FileUploader from './FileUploader'
import { addGrid } from '../../services/gridService'
import { Icon } from '@iconify/react'

export default function CreateModal({ createProject, loading, setLoading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value)
  }
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value)
  }

  return (
    <dialog id="create_modal" className="modal">
      <div className="modal-box text-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-lg">Let's Get Started!</h1>
        <h2 className="text-left font-bold">Create New Grid</h2>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-5">
          <legend className="fieldset-legend">New grid details</legend>

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
        <div className="flex justify-end">
          <button
            className="btn btn-success ml-3"
            onClick={() => createProject(title, description)}
          >
            <Icon icon="qlementine-icons:new-24" className="text-xl" /> Create
            New Grid
          </button>
        </div>
        OR
        <h2 className="text-left font-bold mb-3">Upload JSON File</h2>
        <FileUploader loading={loading} setLoading={setLoading} />
      </div>
    </dialog>
  )
}
