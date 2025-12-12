import { Icon } from '@iconify/react'

export default function GenerateGridModal() {
  return (
    <dialog id="generate_grid_modal" className="modal">
      <div className="modal-box text-center text-white bg-primary/95 p-10">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex gap-3 items-center justify-center">
          <Icon icon="flat-color-icons:idea" className="text-3xl" />
          <h3 className="font-bold text-xl">What's Your Dream Goal?</h3>
        </div>
        <p className="py-4 text-left">
          Please describe what you'd like to achieve and we'll help you generate
          your own custom Harada grid. Don't worry, you can tweak it to fit your
          needs!
        </p>
        <textarea
          placeholder="Ex: 'I want to buy a house within five years.'"
          className="textarea textarea-lg w-full bg-base-200 text-black mt-4 mb-7"
        ></textarea>
        <div className="flex justify-end">
          <button className="btn btn-neutral">
            <Icon icon="si:ai-fill" className="text-lg" />
            Generate My Grid
          </button>
        </div>
      </div>
    </dialog>
  )
}
