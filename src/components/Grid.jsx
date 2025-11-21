import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from './Modal'

export default function Grid({ data }) {
  const [gridData, setGridData] = useState(data)
  const [editing, setEditing] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState([])

  useEffect(() => {
    ;(() => {
      const dataFromLS = localStorage.getItem('harada_grid')

      if (!dataFromLS) {
        return
      } else {
        setGridData(JSON.parse(dataFromLS))
      }
    })()
  }, [gridData])

  const handleClickEdit = (taskId) => {
    setEditing(true)
    setFocused(taskId)
    document.getElementById('task_modal').showModal()
  }

  return (
    <>
      <div className="grid grid-cols-3 border-2 h-full mb-3 text-xs md:text-sm lg:text-md">
        {gridData.grids.map((grid, ind) => (
          <div className="grid grid-cols-3 border-2" key={`grid-${ind + 1}`}>
            {grid.map((task, ind) => (
              <div
                key={task.id}
                className={`hover:bg-gray-200 ease-in-out duration-100 border flex justify-center items-center p-1 relative ${
                  task.id.startsWith('main') || task.slot === 'middle-center'
                    ? 'bg-gray-300 font-bold'
                    : ''
                }`}
                onMouseEnter={() => setHovered(task.id)}
              >
                {hovered === task.id && (
                  <Icon
                    icon="material-symbols:edit-outline"
                    className="text-2xl cursor-pointer absolute top-0 right-0"
                    onClick={() => handleClickEdit(task.id)}
                  />
                )}
                <span className="text-lg">{task.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Modal focused={focused} data={data} setGridData={setGridData} />
    </>
  )
}
