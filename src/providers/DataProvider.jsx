import { createContext, useContext, useEffect, useState } from 'react'
import data from '../../data.json'
import { addGrid, deleteGrid, getGrids } from '../../services/gridService'
import { useToastContext } from './ToastProvider'

export const DataProviderContext = createContext(null)

export default function DataProvider({ children }) {
  const [grids, setGrids] = useState([])

  const fetchGrids = async () => {
    const data = await getGrids()
    console.log(data)
    setGrids(data)
  }

  useEffect(() => {
    fetchGrids()
  }, [])

  return (
    <DataProviderContext.Provider value={{ grids, fetchGrids }}>
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
