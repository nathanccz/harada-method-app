import { Icon } from '@iconify/react'

export default function Accordion(data) {
  return (
    <div className="flex flex-col gap-3">
      <details
        className="collapse bg-slate-800 border border-base-300"
        name="my-accordion-det-1"
        open
      >
        <summary className="collapse-title font-semibold text-md lg:text-xl flex items-center gap-3">
          <Icon icon="et:grid" className="text-2xl" /> Build a custom grid
        </summary>
        <div className="collapse-content text-sm text-left">
          Just set a title and description and you're ready to get started! Fill
          in sub-goals and actions directly in the grid view – or switch to list
          view to edit actions in batches.
        </div>
      </details>
      <details
        className="collapse bg-slate-800  border border-base-300"
        name="my-accordion-det-1"
      >
        <summary className="collapse-title font-semibold text-md lg:text-xl flex items-center gap-3">
          <Icon icon="humbleicons:ai" className="text-2xl" /> Use the AI
          Assistant
        </summary>
        <div className="collapse-content text-sm text-left">
          Have a goal in mind but unsure where to start? The Harada Assistant
          can automatically fill in a grid with sub-goals and actions to
          complete – and you can change things up as needed!
        </div>
      </details>
      <details
        className="collapse bg-slate-800  border border-base-300"
        name="my-accordion-det-1"
      >
        <summary className="collapse-title font-semibold text-md lg:text-xl flex items-center gap-3">
          <Icon
            icon="streamline-plump:graph-bar-increase-remix"
            className="text-2xl"
          />{' '}
          Track your progress
        </summary>
        <div className="collapse-content text-sm text-left">
          As you complete actions, you'll see a rolling weekly view of what
          you've accomplished in the past seven days.
        </div>
      </details>
    </div>
  )
}
