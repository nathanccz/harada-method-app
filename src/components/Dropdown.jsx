import { Icon } from '@iconify/react'
import JsonDownloader from './JsonDownloader'
import PdfDownloader from './PdfDownloader'

export default function Dropdown({}) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <Icon icon="material-symbols:save" className="text-lg" /> Save
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <a>
            <Icon icon="material-symbols:cloud" className="text-lg" />
            Save as Template
          </a>
        </li>
        <li>
          <PdfDownloader />
        </li>
        <li>
          <JsonDownloader storageKey="harada_grid" filename="user_data.json" />
        </li>
      </ul>
    </div>
  )
}
