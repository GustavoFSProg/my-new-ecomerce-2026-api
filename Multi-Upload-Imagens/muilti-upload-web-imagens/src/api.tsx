import axios from 'axios'

export  const api = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://multi-upload-api-images.vercel.app',
})


export const keys = {
  token: 'token',
  data: 'data'
}

export const setItem = (key, data) => {
  return sessionStorage.setItem(key, data)
}

export const getItem = (key) => {
  return sessionStorage.getItem(key)
}

export const clearItems = () => {
  sessionStorage.clear()
  return window.location.reload()
}

api.interceptors.request.use(
  (config) => {
    const token = getItem(keys.token)
    if (token) return { ...config, headers: { 'x-access-token': token } }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response === undefined) {
      const networkError = { error: JSON.parse(JSON.stringify(error)).message }
      return Promise.reject(networkError)
    }

    const { status, data } = error.response
    if (status === 400) return Promise.reject(data)
    if (status === 401) {
      clearItems()
      window.location = '/'
      return window.location.reload()
    }
    return Promise.reject(error)
  }
)


