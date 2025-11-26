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
