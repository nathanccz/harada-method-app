import { calculateOverallProgress } from '../../utils/helpers'

export default function OverallProgressCircle({ gridsArray, size }) {
  const progress = calculateOverallProgress(gridsArray) || ''
  const textSize = size === '4rem' ? 'text-sm' : 'text-xs'

  return (
    <div
      className={`radial-progress bg-primary/80 text-primary-content border-primary border-4 font-bold ${textSize}`}
      style={
        { '--value': progress, '--size': size } /* as React.CSSProperties */
      }
      aria-valuenow={progress}
      role="progressbar"
    >
      {progress}%
    </div>
  )
}
