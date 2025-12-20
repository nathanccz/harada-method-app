const API_BASE_URL = import.meta.env.VITE_API_URL

export const getDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
    credentials: 'include',
  })
  const data = await response.json()
  console.log(data)
  return data
}
