import { useState } from 'react'
import FileUploader from './FileUploader'
import { addGrid } from '../../services/gridService'
import { Icon } from '@iconify/react'
import { useDataContext } from '../providers/DataProvider'

export default function CreateModal({ createProject, loading, setLoading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gridType, setGridType] = useState('')
  const { fetchGrids } = useDataContext()

  const handleClickCreateGrid = async () => {
    const response = await createProject(title, description, gridType)
    fetchGrids()
    document.getElementById('create_modal').close()
  }

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value)
  }
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value)
  }

  const handleClickInput = (event) => {
    const labelName = event.target.labels[0].innerText

    if (labelName === 'ongoing') {
      setGridType('ongoing')
    } else {
      setGridType('project')
    }
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
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-e">
          <legend className="fieldset-legend">New grid details</legend>

          <label className="label">Main Goal</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Main goal (required)"
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
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mb-3">
          <legend className="fieldset-legend">Grid type</legend>
          <div className="flex gap-3 justify-center">
            <label className="label">
              <input
                type="radio"
                name="radio-1"
                className="radio"
                defaultChecked
                onChange={handleClickInput}
              />
              Ongoing
            </label>
            <label className="label">
              <input
                type="radio"
                name="radio-1"
                className="radio"
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
        <div className="flex justify-end">
          <button
            className="btn btn-success ml-3"
            onClick={handleClickCreateGrid}
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
