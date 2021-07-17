import { ref } from 'vue'
import { api } from 'boot/axios'

export default function () {
  const session = ref('loading')
  const getSingleSession = async (id) => {
    session.value = 'loading'
    const url = `/v1/api/session/${id}`
    try {
      const response = await api.get(url)
      session.value = response.data
    } catch (err) {
      console.log(err)
      session.value = 'error'
    }
  }
  return {
    session,
    getSingleSession
  }
}
