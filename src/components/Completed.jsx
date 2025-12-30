import { formatDate } from '../../utils/helpers'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useDataContext } from '../providers/DataProvider'
import GridCardDropdown from './GridCardDropdown'

export default function Completed() {
  const { grids, gridsLoading } = useDataContext()
  const { userData, userDataLoading } = useAuthContext()
  const completedGrids = grids.filter((grid) => grid.completedAt)

  return (
    !gridsLoading &&
    !userDataLoading && (
      <section className="flex flex-col gap-5 mt-5 basis-4/5 w-full lg:h-[85vh] lg:overflow-scroll">
        <h1 className="text-2xl font-bold">My Completed Grids</h1>
        {completedGrids.length > 0 ? (
          <ul className="list bg-slate-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              History
            </li>

            {completedGrids.map((grid) => (
              <li
                className="list-row hover:bg-slate-200 duration-100 ease-in-out"
                key={grid._id}
              >
                <div>
                  {userData.image && (
                    <img className="size-10 rounded-box" src={userData.image} />
                  )}
                </div>
                <div>
                  <div className="font-bold">{grid.title}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Completed on {formatDate(grid.completedAt)}
                  </div>
                </div>
                <p className="list-col-wrap text-xs">{grid.descriptiom}</p>
                <GridCardDropdown gridId={grid._id} />
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>There's nothing here, yet!</p>
          </div>
        )}
      </section>
    )
  )
}
