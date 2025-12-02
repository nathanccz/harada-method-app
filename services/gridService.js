export const addGrid = async (obj) => {
  try {
    console.log(obj)
    const response = await fetch(`http://localhost:3000/api/grids/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
      console.log('something went wrong!')
    } else {
      return { message: 'Grid added successfully!' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGrids = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/grids/all`, {
      credentials: 'include',
    })
    if (!response.ok) {
      console.log('something went wrong')
    }

    const data = await response.json()
    return data.grids
  } catch (error) {
    console.log(error)
  }
}
