import { computed } from 'vue'

function chooseColor (c) {
  switch (c) {
    case 0: return 'green-9'
    case 1: return 'yellow'
    case 2: return 'red'
  }
}

export function format(questions, answers, it) {
  if (!questions || !questions.length) return null
  if (!answers || !answers.length) return null
  if (!it) return null

  let formattedPredicates = []
  let colors = []
  let item = {...it}
  // console.log(item.predicate)

  item.predicate = item.predicate.split('').map(p => parseInt(p))

  item.predicate
    .forEach((o, index) => {
      colors.push(chooseColor(o))
      formattedPredicates.push({
        question: questions[index].question,
        answer: questions[index].answers[o]
      })
    })
  item.formattedPredicates = formattedPredicates
  item.consequence = parseInt(item.consequence)
  item.formattedConsequence = answers[item.consequence]
  item.colors = colors
  return item
}

export function useFormat (questions, answers, it) {
  return computed(() => format(questions.value, answers.value, {...it}))
}

export default function (questions, answers) {
  return (it) => {
    let item = {
      ...it
    }
    // console.log('item')
    // console.log(item)
    let formattedPredicates = []
    let predicate = []
    let colors = []
    // console.log(item.predicate)

    item.predicate
      .split('')
      .map((c, qindex) => ({ qindex, answer: parseInt(c) }))
      .forEach(o => {
        predicate.push(o.answer)
        colors.push(chooseColor(o.answer))
        formattedPredicates.push({
          question: questions[o.qindex].question,
          answer: questions[o.qindex].answers[o.answer]
        })
      })
    const answerIndex = parseInt(item.consequence)
    console.log('answerIndex')
    console.log(answerIndex)
    item.formattedAnswer = answers[answerIndex]
    item.formattedPredicates = formattedPredicates
    item.colors = colors
    item.predicate = predicate
    item.consequence = answerIndex
    return item
  }
}