import { createContext, useContext, useEffect, useState } from 'react'
import data from '../../data.json'
import { addGrid, deleteGrid, getGrids } from '../../services/gridService'
import { useAuthContext } from './AuthContextProvider'

export const DataProviderContext = createContext(null)

export default function DataProvider({ children }) {
  const [grids, setGrids] = useState([])
  const [image, setImage] = useState(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [newAIGeneratedGridId, setNewAIGeneratedGridId] = useState(null)
  const { isAuthenticated } = useAuthContext()

  const fetchGrids = async () => {
    if (!isAuthenticated) return

    const data = await getGrids()
    console.log(data)
    setGrids(data)
  }

  useEffect(() => {
    fetchGrids()
  }, [isAuthenticated])

  return (
    <DataProviderContext.Provider
      value={{
        grids,
        fetchGrids,
        shouldAnimate,
        setShouldAnimate,
        newAIGeneratedGridId,
        setNewAIGeneratedGridId,
        image,
        setImage,
      }}
    >
      {children}
    </DataProviderContext.Provider>
  )
}

export function useDataContext() {
  const context = useContext(DataProviderContext)

  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider')
  }

  return context
}
