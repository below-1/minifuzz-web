import { api } from 'boot/axios'

export default async function removeSession(id) {
  const url = `/v1/api/session/${id}`
  const response = await api.delete(url)
  console.log(response.data)
  return response.data
}
