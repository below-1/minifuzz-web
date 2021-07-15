import { reactive, ref, watch } from 'vue'
import { api } from 'boot/axios'

export default function () {
  const items = ref([])
  const totalPage = ref(0)
  const params = reactive({
    userId: null,
    page: 0,
    perPage: 10
  })
  const loading = ref(false)
  const getSession = () => {
    loading.value = true
    api.get('/api/session', { params: { ...params } })
      .then(resp => {
        items.value = resp.data.items
        totalPage.value = resp.data.totalPage
        loading.value = false
      })
      .catch(err => {
        loading.value = false
        throw err
      })
  }

  watch(
    () => params,
    (prev, next) => getSession()
  )

  return {
    items,
    totalPage,
    params,
    loading,
    getSession
  }
}