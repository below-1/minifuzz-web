import { ref } from 'vue'
import { api } from 'boot/axios'

export default function () {
  const loading = ref(false)
  const remove = async (predicate) => {
    const _predicate = predicate.join('')
    loading.value = true
    try {
      const response = await api.delete(`/api/rule/${_predicate}`)
      return response.data
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    remove
  }
}