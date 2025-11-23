import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from './Modal'
import ClearModal from './ClearModal'
import data from '../../data.json'
import Dropdown from './Dropdown'
import FileUploader from './FileUploader'
import TitleModal from './TitleModal'

export default function Grid() {
  const [gridData, setGridData] = useState(data)
  const [editing, setEditing] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState([])
  const [titleHovered, setTitleHovered] = useState(false)
  const [title, setTitle] = useState('')

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

  const handleClickEdit = (taskId) => {
    setEditing(true)
    setFocused(taskId)
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
          {gridData.title ? gridData.title : 'Untitled'}
        </h1>
      </div>
      <div className="h-[1000px] mb-16 w-[1000px] mx-auto">
        <div className="w-full flex gap-3 justify-between mb-3 items-center">
          <FileUploader setGridData={setGridData} />
          <div>
            <button className="btn btn-neutral" onClick={handleClickClear}>
              <Icon icon="ix:clear" className="text-lg" /> Clear
            </button>
            <Dropdown />
          </div>
        </div>
        <div className="grid grid-cols-3 border-2 w-full h-full mx-auto">
          {gridData.grids.map((grid, ind) => (
            <div className="grid grid-cols-3 border-2" key={`grid-${ind + 1}`}>
              {grid.map((task, ind) => (
                <div
                  key={task.id}
                  className={`hover:bg-gray-200 ease-in-out duration-100 border flex justify-center items-center p-1 relative h-[109px] w-[110px] ${
                    task.id.startsWith('main') || task.slot === 'middle-center'
                      ? 'bg-gray-300 font-bold'
                      : ''
                  }`}
                  onMouseEnter={() => setHovered(task.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === task.id && (
                    <Icon
                      icon="material-symbols:edit-outline"
                      className="text-2xl cursor-pointer absolute top-0 right-0"
                      onClick={() => handleClickEdit(task.id)}
                    />
                  )}
                  <span className="text-md">{task.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Modal focused={focused} data={gridData} setGridData={setGridData} />
        <TitleModal data={gridData} setGridData={setGridData} />
        <ClearModal
          setGridData={setGridData}
          template={data}
          setFocused={setFocused}
        />
      </div>
    </>
  )
}
