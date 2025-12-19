import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function TemplateModal() {
  const [category, setCategory] = useState('')
  const [gridType, setGridType] = useState('')
  const [image, setImage] = useState(null)

  const templateCategories = [
    'Career Growth',
    'Health & Fitness',
    'Learning & Education',
    'Financial Goals',
    'Creative Projects',
    'Entrepreneurship & Business',
    'Relationships & Social',
    'Personal Growth',
    'Home & Lifestyle',
  ]

  const handleInputChange = (event) => {
    setCategory(event.target.value)
  }

  const handleClickExit = () => {
    setCategory('')
    setGridType('ongoing')
  }

  const handleClickInput = (event) => {
    setGridType(event.target.value)
  }

  const handleClickSaveAsTemplate = () => {
    console.log(category, gridType)
  }

  return (
    <dialog id="template_modal" className="modal">
      <div className="modal-box text-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClickExit}
          >
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl">Save as Template</h1>
        <h2 className="text-left font-bold">Set Category</h2>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-e">
          <legend className="fieldset-legend">Category</legend>

          <label className="label">Options</label>
          <select
            value={category || 'Pick a category'}
            className="select"
            onChange={handleInputChange}
          >
            <option disabled={true}>Pick a category</option>
            {templateCategories.map((cat, ind) => (
              <option key={`category-${ind + 1}`}>{cat}</option>
            ))}
          </select>
        </fieldset>
        <h2 className="text-left font-bold mt-5">Set Grid Type</h2>
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mb-3">
          <legend className="fieldset-legend">Grid type</legend>
          <div className="flex gap-3 justify-center">
            <label className="label">
              <input
                type="radio"
                name="template-radio-1"
                className="radio"
                value="ongoing"
                checked={gridType === 'ongoing' ?? ''}
                onChange={handleClickInput}
              />
              Ongoing
            </label>
            <label className="label">
              <input
                type="radio"
                name="template-radio-1"
                className="radio"
                value="project"
                checked={gridType === 'project' ?? ''}
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
            className="btn btn-info ml-3"
            onClick={handleClickSaveAsTemplate}
          >
            <Icon icon="qlementine-icons:new-24" className="text-xl" /> Save as
            Template
          </button>
        </div>
      </div>
    </dialog>
  )
}
