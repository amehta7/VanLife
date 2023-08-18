export const getAllVans = async () => {
  const res = await fetch('/api/vans')

  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    }
  }

  const data = await res.json()
  return data.vans
}

export const getVanById = async (id) => {
  const res = await fetch(`/api/vans/${id}`)

  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    }
  }

  const data = await res.json()
  return data.vans
}

export const getHostVans = async () => {
  const res = await fetch('/api/host/vans')

  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    }
  }

  const data = await res.json()
  return data.vans
}

export const getHostVanById = async (id) => {
  const res = await fetch(`/api/host/vans/${id}`)

  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    }
  }

  const data = await res.json()
  return data.vans
}

export const loginUser = async (userCredential) => {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(userCredential),
  })

  const data = await res.json()

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    }
  }

  return data
}

export const checkUser = () => {
  let user = localStorage.getItem('loggedin')
  return user
}
