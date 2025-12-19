import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDataContext } from '../providers/DataProvider'

export default function SearchBar({ searchBarFocused, setSearchBarFocused }) {
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

    const filtered = grids.filter((grid) =>
      grid.title.toLowerCase().includes(newValue)
    )
    console.log(filtered)
    setResults(filtered)
  }

  const handleClickResult = (gridId) => {
    console.log('hey')
    setResults(null)
    setInputText('')
    navigate(`/dashboard/grid/${gridId}`)
  }

  return (
    <div className="w-full">
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
          onFocus={() => setSearchBarFocused(true)}
          onBlur={() => setSearchBarFocused(false)}
          value={inputText}
        />
      </label>
      {results && searchBarFocused && (
        <div className="bg-slate-300 rounded mt-2 p-1 border-gray-400 border absolute z-99">
          <ul className="flex flex-col gap-2 max-h-[40vh] overflow-scroll">
            {results.length > 0 ? (
              results.map((result) => (
                <li
                  className="cursor-pointer hover:bg-slate-100 transition duration-300 p-3"
                  key={result.$id}
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
