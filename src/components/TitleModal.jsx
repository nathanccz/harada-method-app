import { useState } from 'react'

export default function TitleModal({ data, setGridData }) {
  const [title, setTitle] = useState('')

  const handleFormChange = (e) => {
    setTitle(e.target.value)
  }

  const handleClickSave = () => {
    const copy = { ...data }
    copy.title = title
    copy.lastModified = new Date().toISOString()

    if (!copy.createdAt) {
      copy.createdAt = new Date().toISOString()
    }

    const json = JSON.stringify(copy)

    localStorage.setItem('harada_grid', json)

    setGridData(copy)
  }

  const handleClickExit = () => {
    setTitle('')
  }

  return (
    <dialog id="title_modal" className="modal">
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
        <h3 className="font-bold text-lg mb-3">Edit Title</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={handleFormChange}
          value={title}
        />
        <button className="btn btn-success ml-3" onClick={handleClickSave}>
          Save
        </button>
      </div>
    </dialog>
  )
}
