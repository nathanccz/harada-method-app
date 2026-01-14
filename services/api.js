const BASE_URL = import.meta.env.VITE_API_URL

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function waitForServer(retries = 15, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE_URL}/health`)
      if (res.ok) return
    } catch {}

    await sleep(delay)
  }

  throw new Error('Server did not wake up')
}
