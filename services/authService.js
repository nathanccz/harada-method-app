const API_BASE_URL = import.meta.env.VITE_API_URL

export const getDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/dashboard`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (response.status === 401) {
    console.log('HEYY')
    // window.location.href = 'https://myharada.netlify.app/login'
    // return
  }

  const data = await response.json()

  return data
}
