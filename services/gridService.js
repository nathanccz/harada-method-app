const API_BASE_URL = import.meta.env.VITE_API_URL

export const addGrid = async (obj, token) => {
  const headers = { 'Content-Type': 'application/json' }
  console.log(headers)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const object = { ...obj }
    object.grids[4][4].text = obj.title

    const response = await fetch(`${API_BASE_URL}/grids/add`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(object),
      credentials: 'include',
    })
    const data = await response.json()

    if (!response.ok) {
      console.log('something went wrong!')
    } else {
      return { message: 'Grid added successfully!', gridId: data.gridId }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGrids = async (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}/grids/all`, {
      headers,
      credentials: 'include',
    })
    if (!response.ok) {
      console.log('something went wrong')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getSingleGrid = async (gridId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await fetch(`${API_BASE_URL}/grids/grid/${gridId}`, {
      headers,
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

export const editGridCell = async (gridId, gridArray, token) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}/grids/edit/${gridId}`, {
      method: 'PUT',
      headers,
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

export const deleteGrid = async (gridId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await fetch(`${API_BASE_URL}/grids/delete/${gridId}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    })
    const message = response.message
    console.log(message)
    return { message: 'Grid deleted!' }
  } catch (error) {
    console.log('Error deleting grid:', error)
  }
}

export const editGridDetails = async (
  gridId,
  title,
  description,
  gridType,
  token
) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/grids/editDetails/${gridId}`,
      {
        method: 'PUT',
        headers,
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

export const editGridCells = async (obj, token) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}/grids/editCells/${gridId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
      credentials: 'include',
    })

    const message = response.message

    return { message: 'Grid updated!' }
  } catch (error) {
    console.log('Error editing grid cells:', error)
  }
}

export const clearGrid = async (gridId, choice, token) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}/grids/clearCells/${gridId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ choice: choice }),
      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
    return { message: data.message }
  } catch (error) {
    console.log('Error clearing grid:', error)
  }
}

export const markGridAsCompleted = async (gridId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await fetch(
      `${API_BASE_URL}/grids/markComplete/${gridId}`,
      {
        method: 'PUT',
        headers,
        credentials: 'include',
      }
    )
    if (!response) {
      console.log('Something went wrong!')
    } else {
      return response.message
    }
  } catch (error) {
    console.log('Error marking grid as completed:', error)
  }
}

export const getAIGeneratedGrid = async (message, token) => {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const URL = `${API_BASE_URL}/grids/groqai`
    const response = await fetch(URL, {
      method: 'POST',
      headers,
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
