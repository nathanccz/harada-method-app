import { createContext, useContext, useEffect, useState } from 'react'
import data from '../../data.json'
import { getGrids } from '../../services/gridService'
import { useAuthContext } from './AuthContextProvider'

export const DataProviderContext = createContext(null)

export default function DataProvider({ children }) {
  const [grids, setGrids] = useState([])
  const [templates, setTemplates] = useState([])
  const [image, setImage] = useState(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [newTemplateCreated, setNewTemplateCreated] = useState(false)
  const [newAIGeneratedGridId, setNewAIGeneratedGridId] = useState(null)
  const [gridsLoading, setGridsLoading] = useState(false)
  const { isAuthenticated, setUserDataLoading } = useAuthContext()

  const fetchGrids = async () => {
    if (!isAuthenticated) return
    setGridsLoading(true)
    try {
      const data = await getGrids()
      console.log(data)
      setGrids(data.grids)
      setTemplates(data.templates)
      setGridsLoading(false)
      setUserDataLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGrids()
  }, [isAuthenticated])

  return (
    <DataProviderContext.Provider
      value={{
        grids,
        fetchGrids,
        templates,
        shouldAnimate,
        setShouldAnimate,
        newAIGeneratedGridId,
        setNewAIGeneratedGridId,
        image,
        setImage,
        newTemplateCreated,
        setNewTemplateCreated,
        gridsLoading,
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
