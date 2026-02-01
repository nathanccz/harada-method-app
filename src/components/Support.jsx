import { useNavigate } from 'react-router-dom'
import Contact from './Contact'
import { useEffect } from 'react'
import { useDataContext } from '../providers/DataProvider'

export default function Support() {
  const navigate = useNavigate()
  const { newlyCreatedGridId } = useDataContext()

  useEffect(() => {
    if (newlyCreatedGridId) {
      navigate(`/dashboard/grids`)
    }
  }, [newlyCreatedGridId])

  return (
    <section className="flex flex-col gap-5 mt-5 w-full lg:h-[85vh]">
      <Contact />
    </section>
  )
}
