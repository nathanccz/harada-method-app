import { useState } from 'react'

export default function Modal({ focused, data, setGridData }) {
  const [content, setContent] = useState('')

  const handleFormChange = (e) => {
    setContent(e.target.value)
  }

  const handleClickSave = () => {
    const gridIndex = data.grids.findIndex((grid) =>
      grid.some((task) => task.id === focused)
    )
    const taskIndex = data.grids[gridIndex].findIndex(
      (task) => task.id === focused
    )

    const copy = { ...data }
    copy.grids[gridIndex][taskIndex].text = content

    const json = JSON.stringify(copy)

    localStorage.setItem('harada_grid', json)

    setGridData(copy)
  }

  const handleClickExit = () => {
    setContent('')
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
        <h3 className="font-bold text-lg mb-3">Add Task</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={handleFormChange}
          value={content}
        />
        <button className="btn btn-success ml-3" onClick={handleClickSave}>
          Save
        </button>
      </div>
    </dialog>
  )
}
