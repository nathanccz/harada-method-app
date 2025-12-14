import { Icon } from '@iconify/react'

export default function FilterDropdown({ filterOption, setFilterOption }) {
  const filterOptions = ['All Grids', 'Ongoing Grids', 'Project Grids']

  return (
    <div className="dropdown dropdown-left">
      <div tabIndex={0} role="button" className="btn m-1">
        <Icon icon="cuida:filter-outline" className="text-xl" /> Filter
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {filterOptions.map((option, ind) => (
          <li key={`${option}-${(ind + 1).toString()}`}>
            <a onClick={() => setFilterOption(option)}>
              {' '}
              <input
                type="radio"
                name="filter-radio-1"
                className="radio"
                checked={filterOption === option}
              />
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
