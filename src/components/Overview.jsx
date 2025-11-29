import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function Overview({ gridData }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="h-[1050px] mb-24 w-[1050px] grid grid-cols-3 gap-3 basis-4/5">
      {gridData.grids.map((grid, ind) => (
        <ul
          className={`list ${
            grid[0].id.startsWith('main') ? 'bg-yellow-100' : 'bg-base-100'
          } rounded-box shadow-md hover:bg-base-200 ease-in-out duration-100 border border-transparent hover:border-primary relative`}
          key={`grid-${ind + 1}`}
          onMouseEnter={() =>
            setHovered(grid[0].id.split('-').slice(0, 3).join('-'))
          }
          onMouseLeave={() => setHovered(null)}
        >
          <li className="p-4 pb-2 text-md uppercase opacity-80 font-bold tracking-wide">
            {grid[4].text}
          </li>

          {/* Skip the middle cell since it's in the list title */}
          {[...grid.slice(0, 4), ...grid.slice(5)].map((cell, ind) => (
            <li className="list-row p-2" key={cell.id}>
              <div className="text-xl font-thin opacity-80 tabular-nums">
                {(ind + 1).toString().padStart(2, '0')}
              </div>

              <div className="list-col-grow flex items-center">
                <div>{cell.text}</div>
              </div>
            </li>
          ))}
          {grid[0].id.startsWith(hovered) && (
            <Icon
              icon="material-symbols:edit-outline"
              className="text-2xl cursor-pointer absolute top-0 right-0"
              onClick={() => handleClickEdit(task.id, task.text)}
            />
          )}
        </ul>
      ))}
    </div>
  )
}
