export const getDashboardData = async () => {
  const response = await fetch('http://localhost:3000/api/dashboard', {
    credentials: 'include',
  })
  const data = await response.json()
  console.log(data)
  return data
}
