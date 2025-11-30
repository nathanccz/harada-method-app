import FileUploader from './FileUploader'
import Grid from './Grid'
import NewGridButton from './NewGridButton'
import Stats from './Stats'
import { useModalContext } from '../providers/ModalProvider'

export default function Main() {
  const { openCreateModal } = useModalContext()
  return (
    <main className="flex flex-col gap-5 mt-5 p-10 w-[80%]">
      <h1 className="text-2xl font-bold">Welcome, Nathan</h1>
      <Stats />
      <div className="border rounded border-gray-300 bg-accent p-36 text-center flex flex-col gap-3">
        <h2 className="text-lg font-bold">You don't have any grids, yet!</h2>
        <p>
          Create your first grid to start achieving your goals using the Harada
          Method.
        </p>
        <div className="flex items-center gap-3">
          <NewGridButton
            text={'Create your first Harada Grid'}
            openCreateModal={openCreateModal}
          />{' '}
          <span>OR</span>
          <FileUploader />
        </div>
      </div>
    </main>
  )
}
