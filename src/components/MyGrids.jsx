import { NavLink } from 'react-router-dom'

export default function MyGrids() {
  return (
    <main className="flex flex-col gap-5 mt-5 p-10">
      <h1 className="text-2xl font-bold">My Grids</h1>
      <div className="card w-96 bg-base-100 card-md shadow-sm border border-transparent hover:bg-base-200 hover:border-accent ease-in-out duration-100">
        <div className="card-body">
          <h2 className="card-title">Software Engineering Goals</h2>
          <p>
            A roadmap to getting my first job in software as a mid-level
            engineer.
          </p>
          <span className="text-xs italic">Created at: Nov 25</span>
          <div className="justify-end card-actions">
            <NavLink to={'/dashboard/grids/1'}>
              <button className="btn btn-primary">View Grid</button>
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  )
}
