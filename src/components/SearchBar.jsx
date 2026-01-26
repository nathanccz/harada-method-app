import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDataContext } from '../providers/DataProvider'

export default function SearchBar({ onFocus, onBlur, searchBarFocused }) {
  const [results, setResults] = useState(null)
  const [inputText, setInputText] = useState('')
  const { grids } = useDataContext()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const newValue = e.target.value.toLowerCase()
    setInputText(newValue)

    if (!newValue) {
      setResults('')
      return
    }

    const filtered = grids.filter(
      (grid) =>
        grid.title.toLowerCase().includes(newValue) && !grid.templateCategory
    )

    setResults(filtered)
  }

  const handleClickResult = (gridId) => {
    const URL = getNavLink(gridId)

    setResults(null)
    setInputText('')
    navigate(URL)
  }

  const getNavLink = (gridId) => {
    const grid = grids.find((grid) => grid._id === gridId)
    let url = '/dashboard/'

    if (grid.completedAt) {
      url += `/completed/${gridId}`
    } else if (grid.templateCategory) {
      url += `/templates/${gridId}`
    } else {
      url += `/grids/${gridId}`
    }

    return url
  }

  return (
    <div>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search grids"
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputText}
        />
      </label>
      {results && searchBarFocused && (
        <div className="bg-base-300 rounded mt-2 p-1 border-gray-400 border absolute z-99">
          <ul className="flex flex-col gap-2 max-h-[40vh] overflow-scroll">
            {results.length > 0 ? (
              results.map((result) => (
                <li
                  className="cursor-pointer bg-base-300 hover:bg-accent/40 transition duration-300 p-3"
                  key={result._id}
                  onMouseDown={(e) => e.preventDefault()} //NOTE: Need to add accessibility
                  onClick={() => handleClickResult(result._id)}
                >
                  <span className="font-bold block">{result.title}</span>
                  <span className="text-sm italic">
                    {result.gridType}{' '}
                    {result.completedAt ? '(Completed)' : '(Active grid)'}
                  </span>
                </li>
              ))
            ) : (
              <li className="p-3 italic">Nothing found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
