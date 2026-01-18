import NewGridButton from './NewGridButton'
import Stats from './Stats'
import { useModalContext } from '../providers/ModalProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import Banner from './Banner'
import MainSkeleton from './MainSkeleton'
import { useDataContext } from '../providers/DataProvider'
import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProgressBar from './ProgressBar'

export default function Main() {
  const { openCreateModal } = useModalContext()
  const { userData, userDataLoading } = useAuthContext()
  const {
    shouldAnimate,
    newAIGeneratedGridId,
    fetchGrids,
    grids,
    gridsLoading,
  } = useDataContext()

  const { isTablet, isDesktop } = useOutletContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!shouldAnimate) return

    if (isTablet || isDesktop) {
      localStorage.setItem('view_preference', 'grid')
    } else {
      localStorage.setItem('view_preference', 'list')
    }

    fetchGrids()
    navigate(`/dashboard/grids/${newAIGeneratedGridId}`)
  }, [shouldAnimate])

  return !userDataLoading && !gridsLoading ? (
    <section className="flex flex-col gap-5 mt-5 basis-4/5 relative">
      <h1 className="text-2xl font-bold">
        Welcome, {userData?.firstName || userData?.displayName} 👋
      </h1>
      <Stats />
      <ProgressBar />
      <Banner />
      {grids.length === 0 && (
        <div className="border rounded border-gray-300 bg-secondary text-white p-8 lg:p-36 text-center flex flex-col gap-3">
          <h2 className="text-lg font-bold">You don't have any grids, yet!</h2>
          <p>
            Create your first grid to start achieving your goals using the
            Harada Method.
          </p>
          <div className="flex flex-col mx-auto items-center gap-3 sm:w-50 md:w-80">
            <NewGridButton
              text={'Create your first Harada Grid'}
              openCreateModal={openCreateModal}
            />
          </div>
        </div>
      )}
    </section>
  ) : (
    <MainSkeleton />
  )
}
