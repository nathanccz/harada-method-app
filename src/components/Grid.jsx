import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import data from '../../data.json'
import { useModalContext } from '../providers/ModalProvider'

export default function Grid({ gridData, loading }) {
  const [hovered, setHovered] = useState(null)
  const [text, setText] = useState('')
  const { openEditCellModal } = useModalContext()

  return (
    <>
      {/* MAIN GRID WRAPPER */}
      <div className="h-[900px] w-[900px] mx-auto text-center">
        {/* GRID OR SKELETON */}
        {!loading ? (
          <div className="grid grid-cols-3 mx-auto gap-3">
            {gridData?.grids.map((grid, ind) => (
              <div className="grid grid-cols-3 gap-3" key={`grid-${ind + 1}`}>
                {grid.map((task) => {
                  const isMainCenter =
                    task.id.startsWith('main') && task.slot === 'middle-center'
                  const isMainOrCenter =
                    task.id.startsWith('main') || task.slot === 'middle-center'

                  return (
                    <div
                      key={task.id}
                      className={`hover:bg-gray-200 ease-in-out duration-100 flex justify-center items-center p-1 relative h-[90px] w-[90px] bg-slate-300 rounded
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
                          onClick={() =>
                            openEditCellModal(gridData._id, task.id, task.text)
                          }
                        />
                      )}
                      <span className="text-sm">{task.text}</span>
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
    </>
  )
}
