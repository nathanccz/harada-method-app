export const getDashboardData = async () => {
  const response = await fetch(
    'https://myharada-app-backend.onrender.com/api/dashboard',
    {
      credentials: 'include',
    }
  )
  const data = await response.json()
  console.log(data)
  return data
}
