import { Icon } from '@iconify/react'

export default function Drawer({ data }) {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <label htmlFor="my-drawer-5" className="drawer-button btn btn-primary">
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <h1 className="text-xl font-bold mb-3">{data.text}</h1>
          <div className="flex flex-col gap-3">
            <h2>Add Notes:</h2>
            <textarea className="textarea h-36" placeholder="Bio"></textarea>
            <div className="flex justify-around gap-3">
              <button className="flex-1 btn btn-neutral">View Full</button>
              <button className="flex-1 btn btn-primary">Save Notes</button>
            </div>
          </div>

          {/* <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li> */}
        </ul>
      </div>
    </div>
  )
}
