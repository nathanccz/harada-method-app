import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from './Modal'
import ClearModal from './ClearModal'
import TitleModal from './TitleModal'
import data from '../../data.json'

export default function Grid({
  gridData,
  setGridData,
  loading,
  focused,
  setFocused,
}) {
  const [editing, setEditing] = useState(false)
  const [hovered, setHovered] = useState(null)

  const [text, setText] = useState('')

  const handleClickEdit = (taskId, text) => {
    setEditing(true)
    setFocused(taskId)
    setText(text)
    document.getElementById('task_modal').showModal()
  }

  return (
    <>
      {/* MAIN GRID WRAPPER */}
      <div className="h-[1050px] mb-24 w-[1050px] mx-auto text-center">
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
