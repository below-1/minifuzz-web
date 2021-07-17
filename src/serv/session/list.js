import { reactive, ref, watch } from 'vue'
import { api } from 'boot/axios'

/*
  Return paginated list of sessions with parameters that control the pagination.
  The list will be refetched when parameters changed.

  Return value:
    items: Ref<[]>
    totalPage: Ref<number>
    params: Ref<{ userId: string, page: number, perPage: number }>
    loading: Ref<boolean>
    getSession: () => Promise<void>
*/
export default function useListSession() {
  const items = ref([])
  const totalPage = ref(0)
  const params = reactive({
    userId: null,
    page: 0,
    perPage: 10
  })
  const loading = ref(false)
  const getSession = async () => {
    loading.value = true
    try {
      const resp = await api.get('/v1/api/session', { params: { ...params } });
      items.value = resp.data.items;
      totalPage.value = resp.data.totalPage
      loading.value = false

    } catch (err) {
        loading.value = false
        console.log(err)
    }
  }

  watch(params, getSession)

  return {
    items,
    totalPage,
    params,
    loading,
    getSession
  }
}
