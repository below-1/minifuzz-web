import { ref } from 'vue'
import { api } from 'boot/axios'

const getFromNetwork = () => api.get('/v1/api/question')
  .then(resp => {
    localStorage.setItem('questions', JSON.stringify(resp.data))
    return resp.data
  })

const getFromLocalStorage = async () => {
  let raw = localStorage.getItem('questions')
  if (!raw) {
    throw new Error('empty')
  }
  return JSON.parse(raw)
}

export const getQuestions = () => {
  return getFromLocalStorage()
    .catch(err => {
      return getFromNetwork()
    })
}

export default function () {
  const questions = ref([])
  const answers = ref([])
  const loading = ref(false)

  const $getQuestions = async () => {
    loading.value = true
    const data = await getQuestions()
    questions.value = data.questions
    answers.value = data.answers
    loading.value = false
  }

  return {
    loading,
    questions,
    answers,
    getQuestions: $getQuestions
  }
}