import { KEY } from '@/utils/KEY'

export const setToken = (value) => {
  return window.sessionStorage.setItem(KEY, value)
}

export const getToken = () => {
  return window.sessionStorage.getItem(KEY)
}

export const removeToken = () => {
  return window.sessionStorage.removeItem(KEY)
}
