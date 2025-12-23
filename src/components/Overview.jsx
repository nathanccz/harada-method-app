import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useModalContext } from '../providers/ModalProvider'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthContextProvider'
import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Overview({
  gridData,
  shouldAnimate,
  setShouldAnimate,
}) {
  const [hovered, setHovered] = useState(null)
  const { id } = useParams()
  const { openEditListModal, setCurrentParams } = useModalContext()
  const { loading } = useAuthContext()
  const { fetchGrids } = useDataContext()
  const container = useRef()

  useGSAP(
    () => {
      if (!shouldAnimate || !gridData) return

      gsap.from('.subGoal > *', {
        opacity: 0,
        y: 20,
        stagger: 0.2, // More delay between each item
        duration: 1.7, // Each item takes longer to animate
        ease: 'power2.out', // Smooth easing
      })

      setShouldAnimate(false)
    },
    { dependencies: [gridData] } // <- triggers animation when 'results' changes
  )

  const handleClickOpenEditListModal = (index) => {
    openEditListModal(index)
    setCurrentParams(id)
  }

  const handleClickCheck = async (cellId) => {
    const updatedGrid = { ...gridData }

    const gridIndex = updatedGrid.grids.findIndex((grid) =>
      grid.some((cell) => cell.id === cellId)
    )

    const taskIndex = updatedGrid.grids[gridIndex].findIndex(
      (cell) => cell.id === cellId
    )

    const isCompleted = updatedGrid.grids[gridIndex][taskIndex].completedAt

    if (!isCompleted) {
      updatedGrid.grids[gridIndex][taskIndex].completedAt =
        new Date().toISOString()
    } else {
      updatedGrid.grids[gridIndex][taskIndex].completedAt = ''
    }

    if (
      updatedGrid.grids[gridIndex]
        .filter((grid) => grid.slot !== 'middle-center')
        .every((cell) => cell.completedAt)
    ) {
      updatedGrid.grids[gridIndex][4].completedAt = new Date().toISOString()
    } else {
      updatedGrid.grids[gridIndex][4].completedAt = ''
    }

    try {
      const response = await editGridCell(updatedGrid._id, updatedGrid.grids)
      if (!response) {
        console.log('Something went wrong.')
        return
      } else {
        fetchGrids()
        console.log(response.message)
      }
    } catch (error) {
      console.log('Error updating grid:', error)
    }

    if (
      updatedGrid.grids
        .flat()
        .flat()
        .every((grid) => grid.completedAt)
    ) {
      showCompletionModal()
    }
  }

  const showCompletionModal = () => {
    document.getElementById('completion_modal').showModal()
  }

  const calculateFraction = (subGrid) => {
    const completed = subGrid.filter(
      (cell) => cell.completedAt && cell.slot !== 'middle-center'
    ).length

    return `${completed}/8`
  }

  const calculatePercentage = (subGrid) => {
    const completed = subGrid.filter((cell) => cell.completedAt).length

    return Math.floor((completed / 8) * 100)
  }

  return (
    <div
      ref={container}
      className="lg:max-h-[950px] max-w-[950px] mb-24 grid grid-cols-1 lg:grid-cols-3 gap-3 basis-4/5 lg:overflow-scroll border border-accent/25 rounded-lg p-3 "
    >
      {!loading ? (
        gridData?.grids.map((grid, ind) => (
          <ul
            className={`list ${
              grid[0].id.startsWith('main') ? 'bg-yellow-100' : 'bg-slate-100'
            } rounded-box shadow-md hover:bg-slate-200 ease-in-out duration-100 border border-transparent hover:border-primary relative subGoal`}
            key={`grid-${ind + 1}`}
            onMouseEnter={() =>
              setHovered(grid[0].id.split('-').slice(0, 3).join('-'))
            }
            onMouseLeave={() => setHovered(null)}
          >
            <li className="p-2 pb-2 text-md opacity-80 font-bold uppercase tracking-wide flex gap-2 items-center">
              {gridData.gridType === 'project' &&
                !gridData.completedAt &&
                !gridData.templateCategory && (
                  <div
                    className="radial-progress text-secondary custom-radial-size text-[10px]"
                    style={
                      {
                        '--value': calculatePercentage(grid),
                        '--size': '2.5rem',
                      } /* as React.CSSProperties */
                    }
                    aria-valuenow={calculatePercentage(grid)}
                    role="progressbar"
                  >
                    {calculateFraction(grid)}
                  </div>
                )}
              <span>
                {grid.slot === 'middle-center'
                  ? 'Main Goal'
                  : `Pillar ${ind + 1}`}
              </span>
            </li>
            <li>
              <span>{grid[4].text}</span>
            </li>
            {/* Skip the middle cell since it's in the list title */}
            {[...grid.slice(0, 4), ...grid.slice(5)].map((cell, ind) => (
              <li className="list-row p-2" key={cell.id}>
                <div className="text-xl font-thin opacity-80 tabular-nums">
                  {(ind + 1).toString().padStart(2, '0')}
                </div>

                <div className="list-col-grow flex items-center">
                  <div
                    className={cell.completedAt && 'text-gray-500 line-through'}
                  >
                    {cell.text}
                  </div>
                </div>
                {gridData.gridType === 'project' &&
                  cell.text &&
                  !gridData.completedAt &&
                  !gridData.templateCategory && (
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={cell.completedAt ?? false}
                        className="checkbox checkbox-success"
                        onChange={() => handleClickCheck(cell.id)}
                      />
                    </div>
                  )}
              </li>
            ))}
            {grid[0].id.startsWith(hovered) &&
              !gridData.completedAt &&
              !gridData.templateCategory && (
                <Icon
                  icon="material-symbols:edit-outline"
                  className="text-2xl cursor-pointer absolute top-1 right-1"
                  onClick={() => handleClickOpenEditListModal(ind)}
                />
              )}
          </ul>
        ))
      ) : (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="skeleton h-96 w-72" key={`skeleton-${i + 1}`}></div>
          ))}
        </>
      )}
    </div>
  )
}
