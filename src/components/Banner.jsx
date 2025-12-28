import { Icon } from '@iconify/react'
import { useModalContext } from '../providers/ModalProvider'

export default function Banner() {
  const { openGenerateGridModal } = useModalContext()
  return (
    <div className="hero bg-base-200 rounded">
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <figure className="flex-1">
          <img
            src="/automation-section-photo.jpg"
            className="rounded-lg shadow-2xl"
          />
        </figure>
        <div className="flex-1 md:flex-2">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Meet Your Harada Assistant
          </h1>
          <p className="py-6">
            When it comes to setting goals, figuring out what tasks to complete
            can be the most difficult part. The Harada Assistant can help you
            break down any achievable goal into short tasks, and it
            automatically fills in a Harada grid for you! You can further refine
            any generated grid to fit your needs.
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
