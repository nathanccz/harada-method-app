import { formatDate } from '../../utils/helpers'
import { useDataContext } from '../providers/DataProvider'

export default function Completed() {
  const { grids } = useDataContext()

  const completedGrids = grids.filter((grid) => grid.completedAt)

  return (
    <main className="flex flex-col gap-5 mt-5 p-10 basis-4/5">
      <h1 className="text-2xl font-bold">My Completed Grids</h1>
      {completedGrids.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">History</li>

          {completedGrids.map((grid) => (
            <li className="list-row" key={grid._id}>
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div className="font-bold">{grid.title}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Completed on {formatDate(grid.completedAt)}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{grid.descriptiom}</p>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>There's nothing here, yet!</p>
        </div>
      )}
    </main>
  )
}
