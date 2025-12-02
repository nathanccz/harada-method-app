import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getGrids } from '../../services/gridService'
import { formatDate } from '../../utils/helpers'

export default function MyGrids() {
  const [grids, setGrids] = useState([])

  useEffect(() => {
    async function fetchGrids() {
      const data = await getGrids()
      console.log(data)
      setGrids(data)
    }

    fetchGrids()
  }, [])

  return (
    <main className="flex flex-col gap-5 mt-5 p-10 basis-4/5">
      <h1 className="text-2xl font-bold">My Grids</h1>
      <div className="grid grid-cols-3 gap-3">
        {grids.length > 0 ? (
          grids.map((grid) => (
            <div
              key={grid._id}
              className="card bg-base-100 card-md shadow-sm border border-transparent hover:bg-base-200 hover:border-accent ease-in-out duration-100"
            >
              <div className="card-body">
                <h2 className="card-title">{grid.title}</h2>
                <p>{grid.description}</p>
                <span className="text-xs italic">
                  Created at: {formatDate(grid.createdAt)}
                </span>
                <div className="justify-end card-actions">
                  <NavLink to={`/dashboard/grid/${grid._id}`}>
                    <button className="btn btn-primary">View Grid</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't created any grids, yet!</p>
        )}
      </div>
    </main>
  )
}
