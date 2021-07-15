import { computed, isRef, isReactive } from 'vue'

export default function(questions, answers) {

  const qs = computed(() => {
    const _qs = isRef(questions) ? questions.value : [...questions]
    return _qs.map(_q => {
      const q = { ..._q }
      return {
        question: q.question,
        answers: q.answers.map((a, index) => {
          return {
            label: a,
            value: index
          }
        })
      }
    })
  })
  const as = computed(() => {
    const _as = isRef(answers) ? answers.value : [...answers]
    const as = [..._as]
    return as.map((a, index) => ({
      value: index,
      label: a
    }))
  })

  return {
    questions: qs,
    answers: as
  }
}