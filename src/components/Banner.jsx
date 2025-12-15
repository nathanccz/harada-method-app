import { Icon } from '@iconify/react'
import { useModalContext } from '../providers/ModalProvider'

export default function Banner() {
  const { openGenerateGridModal } = useModalContext()
  return (
    <div className="hero bg-base-200 rounded">
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <figure className="flex-1">
          <img
            src="https://cdn.britannica.com/53/280453-004-B1BC6AEC/Shohei-Ohtani-LA-Dodgers-portrait-2024.jpg"
            className="rounded-lg shadow-2xl"
          />
        </figure>
        <div className="flex-1 md:flex-2">
          <h1 className="text-2xl lg:text-4xl font-bold">Be Like Shohei</h1>
          <p className="py-6">
            Have a dream goal in mind but unsure how to achieve it? Let the
            Harada Assistant help you break it up into customized tasks and
            automatically fill in a new grid for you – and it's completely free!
          </p>
          <button className="btn btn-primary" onClick={openGenerateGridModal}>
            <Icon icon="si:ai-fill" className="text-lg" />
            Generate Harada Grid
          </button>
        </div>
      </div>
    </div>
  )
}
