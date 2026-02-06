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
