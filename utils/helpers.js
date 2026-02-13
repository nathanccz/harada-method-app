const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function formatDate(date) {
  const createdAt = new Date(date)
  const month = createdAt.getMonth()
  const day = createdAt.getDate()
  const year = createdAt.getFullYear()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `${months[month]} ${day}, ${year}`
}

export function isValidEmail(email) {
  if (typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export function formatFileName(gridTitle) {
  console.log(gridTitle)
  return gridTitle
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-')
}

export function calculateOverallProgress(grids) {
  const totalCells = grids?.flat().length
  const totalCompleted = grids
    ?.flat()
    ?.filter((cell) => cell.completedAt).length
  return Math.floor((totalCompleted / totalCells) * 100)
}

export function toLocalDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getTitle(cellId) {
  if (!cellId) return ''

  if (cellId === 'main-5') {
    return 'Main Goal'
  } else if (cellId.startsWith('main') && cellId !== 'main-5') {
    const split = cellId.split('-')
    const position = split[split.length - 1]

    return `Pillar ${position < 5 ? position : position - 1}`
  } else if (cellId.startsWith('outer')) {
    const split = cellId.split('-')
    const gridIndex = Number(split[1])
    const taskIndex = Number(split[2])

    if (taskIndex === 5) {
      return `Pillar ${gridIndex + 1}`
    } else {
      return 'Action'
    }
  }
}

export function timeSince(isoString) {
  const date = new Date(isoString)
  const seconds = Math.floor((new Date() - date) / 1000)
  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return count + ' ' + interval.unit + (count > 1 ? 's' : '') + ' ago'
    }
  }
  return 'just now'
}

export function getBadgeClassName(cellId) {
  const cellType = getTitle(cellId).toLowerCase().split(' ')[0]
  const tags = {
    main: 'badge-primary',
    pillar: 'badge-secondary',
    action: 'badge-accent',
  }

  return `badge ${tags[cellType]}`
}

export function getStatusIcon(status) {
  const icons = {
    waiting: {
      icon: 'material-symbols:person',
      class: 'text-orange-500',
    },
    thinking: {
      icon: 'line-md:lightbulb-twotone',
      class: 'text-yellow-200',
    },
    blocked: { icon: 'fluent-mdl2:blocked-solid', class: 'text-purple-500' },
    important: {
      icon: 'fluent:important-12-filled',
      class: 'text-red-500',
    },
    complete: {
      icon: 'fluent-mdl2:completed-solid',
      class: 'text-green-500',
    },
  }

  return icons[status]
}

export function getFullStatus(status) {
  const fullStatuses = {
    waiting: 'Waiting on someone',
    thinking: 'Needs more thought',
    blocked: 'Blocked',
    important: 'Important',
    complete: 'Complete',
  }

  return fullStatuses[status]
}
