import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { getQuestions } from 'src/serv/question'
import { format } from './format'

export default function () {
  const item = reactive({
    _id: null,
    createdAt: null,
    updatedAt: null,
    predicate: [0, 0, 0, 0, 0, 0, 0, 0],
    consequence: 0,
    formattedPredicates: [],
    formattedConsequence: null,
    colors: []
  })
  const stat = ref('idle')

  const getDetail = async (_id) => {
    stat.value = 'loading'
    const questionsData = await getQuestions()
    const questions = questionsData.questions
    const answers = questionsData.answers
    const resp = await api.get(`/api/rule/${_id}`)
    const { data } = resp
    const formatted = format(questions, answers, data)
    item._id = formatted._id
    item.predicate = formatted.predicate
    item.consequence = formatted.consequence
    item.formattedPredicates = formatted.formattedPredicates
    item.formattedConsequence = formatted.formattedConsequence
    item.colors = formatted.colors
    item.createdAt = formatted.createdAt
    item.updatedAt = formatted.updatedAt
    stat.value = 'done'
    return formatted
  }

  return {
    item, 
    stat,
    getDetail
  }
}