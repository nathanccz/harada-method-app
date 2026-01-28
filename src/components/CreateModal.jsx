import { useState } from 'react'
import FileUploader from './FileUploader'
import { Icon } from '@iconify/react'
import { useDataContext } from '../providers/DataProvider'

export default function CreateModal({ createProject }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gridType, setGridType] = useState('ongoing')
  const [loading, setLoading] = useState(false)
  const { fetchGrids } = useDataContext()

  const handleClickCreateGrid = async () => {
    setLoading(true)
    const response = await createProject(title, description, gridType)
    if (response) {
      fetchGrids()
      setTitle('')
      setDescription('')
      setLoading(false)
      document.getElementById('create_modal').close()
    }
  }

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value)
  }
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleClickInput = (event) => {
    setGridType(event.target.value)
  }

  const handleClickExit = () => {
    setGridType('ongoing')
    setTitle('')
    setDescription('')
    document.getElementById('json-uploader').value = ''
  }

  return (
    <dialog id="create_modal" className="modal">
      <div className="modal-box text-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl"
            onClick={handleClickExit}
          >
            ✕
          </button>
        </form>
        <h1 className="font-bold text-lg">Let's Get Started!</h1>
        <h2 className="text-left font-bold">Create New Grid</h2>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-e">
          <legend className="fieldset-legend">New grid details</legend>

          <label className="label">Main Goal</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Main goal (required)"
            onChange={handleTitleInputChange}
            value={title}
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Short description"
            onChange={handleDescriptionInputChange}
            value={description}
          />
        </fieldset>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mb-3">
          <legend className="fieldset-legend">Grid type</legend>
          <div className="flex gap-3 justify-center">
            <label className="label">
              <input
                type="radio"
                name="create-radio-1"
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
                name="create-radio-1"
                className="radio"
                value="project"
                checked={gridType === 'project'}
                onChange={handleClickInput}
              />
              Project-based
            </label>
            <div
              className="tooltip"
              data-tip="Project-based grids let you mark completed actions and track progress."
            >
              <button className="btn">
                <Icon icon="ri:question-line" className="text-xl" />
              </button>
            </div>
          </div>
        </fieldset>
        <div className="flex justify-end">
          {!loading ? (
            <button
              className="btn btn-info ml-3"
              onClick={handleClickCreateGrid}
            >
              <Icon icon="qlementine-icons:new-24" className="text-xl" /> Create
              New Grid
            </button>
          ) : (
            <button className="btn btn-info ml-3">
              <span className="loading loading-spinner loading-md" /> Creating
              New Grid...
            </button>
          )}
        </div>
        <span className="block my-3 font-bold">OR</span>
        <h2 className="text-left font-bold mb-3">Upload JSON File</h2>
        <FileUploader loading={loading} setLoading={setLoading} />
      </div>
    </dialog>
  )
}
