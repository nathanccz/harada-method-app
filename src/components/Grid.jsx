import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalContext } from '../providers/ModalProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useDataContext } from '../providers/DataProvider'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Grid({
  gridData,
  setGridData,
  shouldAnimate,
  setShouldAnimate,
  setCurrentCell,
}) {
  const [hovered, setHovered] = useState(null)
  const { userDataLoading } = useAuthContext()
  const { gridsLoading } = useDataContext()
  const { openEditCellModal } = useModalContext()

  const container = useRef()

  useGSAP(
    () => {
      if (!shouldAnimate || !gridData || gridData.length === 0) return

      gsap.from('.subGrid > *', {
        opacity: 0,
        y: 20,
        stagger: 0.8, // More delay between each item
        duration: 2.5, // Each item takes longer to animate
        ease: 'power2.out', // Smooth easing
      })

      setShouldAnimate(false)
    },
    { dependencies: [shouldAnimate, gridData] } // <- triggers animation when 'results' changes
  )

  return (
    <>
      {/* MAIN GRID WRAPPER */}
      <div className="max-h-[950px] max-w-[950px] mx-auto text-center text-black mb-10">
        {/* GRID OR SKELETON */}
        {!gridsLoading && !userDataLoading ? (
          <div className="grid grid-cols-3 mx-auto gap-4 subGrid">
            {gridData?.grids.map((grid, ind) => (
              <div className="grid grid-cols-3 gap-2" key={`grid-${ind + 1}`}>
                {grid.map((task) => {
                  const isMainCenter =
                    task.id.startsWith('main') && task.slot === 'middle-center'
                  const isMainOrCenter =
                    task.id.startsWith('main') || task.slot === 'middle-center'

                  return (
                    <label
                      htmlFor={
                        !gridData.templateCategory && !gridData.completedAt
                          ? 'my-drawer-5'
                          : ''
                      }
                    >
                      <div
                        key={task.id}
                        className={`hover:bg-gray-200 ease-in-out flex justify-center items-center p-1 relative h-[95px] w-[95px] bg-slate-300 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 hyphens-auto cursor-pointer
                      ${
                        isMainCenter
                          ? 'bg-yellow-200 font-bold hover:bg-yellow-100'
                          : isMainOrCenter
                            ? 'bg-slate-400 font-bold'
                            : ''
                      }`}
                        onMouseEnter={() => setHovered(task.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setCurrentCell(task)}
                      >
                        {hovered === task.id &&
                          !gridData.completedAt &&
                          !gridData.templateCategory && (
                            <Icon
                              icon="material-symbols:edit-outline"
                              className="text-2xl cursor-pointer absolute top-0 right-0"
                              onClick={() =>
                                openEditCellModal(
                                  gridData._id,
                                  task.id,
                                  task.text
                                )
                              }
                            />
                          )}
                        <span className="text-xs">{task.text}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            ))}
          </div>
        ) : (
          // Skeleton shaped like the entire grid area
          <div className="grid grid-cols-3 mx-auto gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((__, j) => (
                  <div key={j} className="skeleton h-[90px] w-[90px] rounded" />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
