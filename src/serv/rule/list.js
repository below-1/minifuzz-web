import { ref, reactive, computed, watch } from 'vue'
import { api } from 'boot/axios'
import { getQuestions } from 'src/serv/question'
import { format } from './format'

export default function () {
  const params = reactive({
    page: 0,
    perPage: 10
  })
  const totalPage = ref(0)
  const items = ref([])
  const loading = ref(false)

  const getRules = async () => {
    loading.value = true
    try {
      const questionsData = await getQuestions()
      const questions = questionsData.questions
      const answers = questionsData.answers
      const resp = await api.get('/v1/api/rule', { params })
      const { data } = resp
      items.value = data.items.map(it => format(questions, answers, it))
      totalPage.value = data.totalPage
      loading.value = false
    } catch (err) {
      loading.value = false
      throw err
    }
  }

  watch(params, getRules)

  return {
    params,
    items, 
    loading,
    getRules,
    totalPage
  }  
}
