const API_BASE_URL = import.meta.env.VITE_API_URL

export const addGrid = async (obj) => {
  try {
    const object = { ...obj }
    object.grids[4][4].text = obj.title

    const response = await fetch(`${API_BASE_URL}/api/grids/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object),
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
    const response = await fetch(`${API_BASE_URL}/api/grids/all`, {
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

export const getSingleGrid = async (gridId) => {
  console.log(gridId)
  try {
    const response = await fetch(`${API_BASE_URL}/api/grids/grid/${gridId}`, {
      credentials: 'include',
    })
    if (!response.ok) {
      console.log('something went wrong')
    }

    const data = await response.json()
    console.log(data)
    return data.grid
  } catch (error) {
    console.log(error)
  }
}

export const editGridCell = async (gridId, gridArray) => {
  console.log(gridArray)
  try {
    const response = await fetch(`${API_BASE_URL}/api/grids/edit/${gridId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grid: gridArray }),
      credentials: 'include',
    })

    if (!response) {
      console.log('Something went wrong')
    } else {
      return { message: 'Grid successfully updated' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteGrid = async (gridId) => {
  console.log(gridId)

  try {
    const response = await fetch(`${API_BASE_URL}/api/grids/delete/${gridId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const message = response.message
    return { message: 'Grid deleted!' }
  } catch (error) {
    console.log('Error deleting grid:', error)
  }
}

export const editGridDetails = async (gridId, title, description, gridType) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/grids/editDetails/${gridId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          description: description,
          gridType: gridType,
        }),
        credentials: 'include',
      }
    )

    const message = response.message

    return { message: 'Grid details updated!' }
  } catch (error) {
    console.log('Error editing grid:', error)
  }
}

export const editGridCells = async (obj) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/grids/editCells/${gridId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
        credentials: 'include',
      }
    )

    const message = response.message

    return { message: 'Grid updated!' }
  } catch (error) {
    console.log('Error editing grid cells:', error)
  }
}

export const clearGridCells = async (gridId) => {
  try {
    const response = fetch(`${API_BASE_URL}/api/grids/clearCells/${gridId}`, {
      method: 'PUT',
      credentials: 'include',
    })
    console.log(response)
    return { message: 'Grid cleared!' }
  } catch (error) {
    console.log('Error clearing grid:', error)
  }
}

export const markGridAsCompleted = async (gridId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/grids/markComplete/${gridId}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    )
    console.log(response)
    if (!response) {
      console.log('Something went wrong!')
    } else {
      return response.message
    }
  } catch (error) {
    console.log('Error marking grid as completed:', error)
  }
}

export const getAIGeneratedGrid = async (message) => {
  try {
    const URL = `${API_BASE_URL}/api/grids/groqai`
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
