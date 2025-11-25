import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from './Modal'
import ClearModal from './ClearModal'
import data from '../../data.json'
import Dropdown from './Dropdown'
import FileUploader from './FileUploader'
import TitleModal from './TitleModal'
import { formatDate } from '../../utils/helpers'

export default function Grid() {
  const [gridData, setGridData] = useState(data)
  const [editing, setEditing] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState([])
  const [loading, setLoading] = useState(false)
  const [titleHovered, setTitleHovered] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    ;(() => {
      const dataFromLS = localStorage.getItem('harada_grid')

      if (!dataFromLS) {
        setGridData(data)
      } else {
        setGridData(JSON.parse(dataFromLS))
      }
    })()
  }, [focused])

  const handleClickEdit = (taskId, text) => {
    setEditing(true)
    setFocused(taskId)
    setText(text)
    document.getElementById('task_modal').showModal()
  }

  const handleClickClear = () => {
    document.getElementById('clear_modal').showModal()
  }

  const handleClickEditTitle = () => {
    document.getElementById('title_modal').showModal()
  }

  return (
    <>
      {/* TITLE AREA */}
      <div
        className="relative w-fit mx-auto rounded hover:bg-gray-300 duration-100 p-2"
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
      >
        {titleHovered && (
          <Icon
            icon="material-symbols:edit-outline"
            className="text-2xl cursor-pointer absolute top-0 right-0"
            onClick={handleClickEditTitle}
          />
        )}

        <h1 className="text-2xl font-bold p-3">
          {gridData.title || 'Untitled'}
        </h1>
      </div>

      {/* LAST MODIFIED */}
      {gridData.lastModified && (
        <span className="text-sm italic">
          Last modified: {formatDate(gridData.lastModified)}
        </span>
      )}

      {/* MAIN GRID WRAPPER */}
      <div className="h-[1050px] mb-24 w-[1050px] mx-auto">
        {/* TOP CONTROLS */}
        <div className="w-full flex gap-3 justify-between mb-3 items-center">
          <FileUploader
            setGridData={setGridData}
            loading={loading}
            setLoading={setLoading}
          />

          <div>
            <button className="btn btn-neutral" onClick={handleClickClear}>
              <Icon icon="ix:clear" className="text-lg" /> Clear
            </button>
            <Dropdown />
          </div>
        </div>

        {/* GRID OR SKELETON */}
        {!loading ? (
          <div className="grid grid-cols-3 w-full h-full mx-auto gap-3">
            {gridData.grids.map((grid, ind) => (
              <div className="grid grid-cols-3 gap-3" key={`grid-${ind + 1}`}>
                {grid.map((task) => {
                  const isMainCenter =
                    task.id.startsWith('main') && task.slot === 'middle-center'
                  const isMainOrCenter =
                    task.id.startsWith('main') || task.slot === 'middle-center'

                  return (
                    <div
                      key={task.id}
                      className={`hover:bg-gray-200 ease-in-out duration-100 flex justify-center items-center p-1 relative h-[109px] w-[110px] bg-slate-300 rounded
                      ${
                        isMainCenter
                          ? 'bg-yellow-200 font-bold hover:bg-yellow-100'
                          : isMainOrCenter
                          ? 'bg-slate-400 font-bold'
                          : ''
                      }`}
                      onMouseEnter={() => setHovered(task.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {hovered === task.id && (
                        <Icon
                          icon="material-symbols:edit-outline"
                          className="text-2xl cursor-pointer absolute top-0 right-0"
                          onClick={() => handleClickEdit(task.id, task.text)}
                        />
                      )}
                      <span className="text-md">{task.text}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ) : (
          // Skeleton shaped like the entire grid area
          <div className="grid grid-cols-3 w-full h-full mx-auto gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((__, j) => (
                  <div
                    key={j}
                    className="skeleton h-[109px] w-[110px] rounded"
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}
      <Modal
        focused={focused}
        data={gridData}
        setGridData={setGridData}
        text={text}
      />
      <TitleModal data={gridData} setGridData={setGridData} />
      <ClearModal
        setGridData={setGridData}
        template={data}
        setFocused={setFocused}
      />
    </>
  )
}
