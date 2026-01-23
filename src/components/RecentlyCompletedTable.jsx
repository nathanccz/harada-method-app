import { toLocalDateString } from '../../utils/helpers'
import { NavLink } from 'react-router-dom'

export default function RecentlyCompletedTable({ data }) {
  const completed = []

  for (const grid of data) {
    const flattened = grid.grids.flat().flat()
    const title = grid.title
    const gridId = grid._id

    for (const cell of flattened) {
      if (cell.completedAt) {
        completed.push({ ...cell, gridTitle: title, gridId: gridId })
      }
    }
  }

  const sorted = [...completed]
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10)

  return (
    <div className="overflow-x-auto border border-gray-200 rounded">
      <table className="table table-zebra ">
        {/* head */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Grid Name</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((cell, ind) => (
            <tr key={`task-${ind + 1}`}>
              <td>{toLocalDateString(new Date(cell.completedAt))}</td>
              <td>{cell.text}</td>
              <td>
                <NavLink to={`/dashboard/grids/${cell.gridId}`}>
                  <span className="hover:bg-accent/20 hover:underline ease-in-out duration-100 p-1 border border-transparent rounded">
                    {cell.gridTitle}
                  </span>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
