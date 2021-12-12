import { computed, unref } from 'vue'
import { format, formatDistance, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import fields from './fields'

const FORMAT_STRING = 'HH:mm dd MMMM, yyyy'

/*
  Return the original session plus the [format] field.
  format = {
    fields: [{ question: string, answer: string }],
    outputs: [ { consequence: string, confidence: string } ]
  }
*/
// export default function(options) {
//   const { questions, answers } = options
//   const decimal = !isNaN(options.decimal) ? options.decimal : 3
//   return (session) => {
//     let result = { ...session };
//     let format = {};

//     format.fields = fields.map((key, index) => {
//       const question = questions[index].question;
//       const answer = questions[index].answers[session[key]];
//       return {
//         question,
//         answer
//       };
//     });

//     format.output = session.outputs.map(o => {
//       const consequence = answers[o.consequence]
//       const confidence = o.confidence.toFixed(decimal)
//       return {
//         consequence,
//         confidence
//       }
//     });

//     const now = new Date();
//     const start = new Date(session.start);
//     const end = new Date(session.end);
//     format.timeTaken = formatDistance(start, end, { locale: id })
//     format.start = formatDate(start, FORMAT_STRING, { locale: id })
//     format.end = formatDate(end, FORMAT_STRING, { locale: id })
//     format.elapsed = formatDistance(end, now, { locale: id, addSuffix: true })

//     result.format = format;
//     return result;
//   }
// }

export function formatDate(options) {
  if (!options.start) {
    console.log(options)
    throw new Error('start is undefined')
  }
  if (!options.end) {
    console.log(options)
    throw new Error('end is undefined')
  }
  const now = new Date();
  const dstart = new Date(options.start);
  const dend = new Date(options.end);

  const timeTaken = formatDistance(dstart, dend, { locale: id })
  const start = format(dstart, FORMAT_STRING, { locale: id })
  const end = format(dend, FORMAT_STRING, { locale: id })
  const elapsed = formatDistance(dend, now, { locale: id, addSuffix: true });

  return {
    timeTaken,
    start,
    end,
    elapsed
  }
}

export function formatOutputBuilder(options) {
  const { questions, answers } = options
  const decimal = !isNaN(options.decimal) ? options.decimal : 2
  return (output) => {
    const consequence = answers[output.consequence]
    const confidence = `${(output.confidence).toFixed(decimal)}%`
    return {
      consequence,
      confidence
    }
  }
}

export function useFormatDate(start, end) {
  return computed(() => formatDate({ start: start.value, end: end.value }))
}

export function useFormatOutputs({ formatOutput, outputs }) {
  return computed(() => outputs.value.map(formatOutput).map(it => it.consequence).join(', '))
}

export function useFormatAnswers(session, questions) {
  return computed(() => {
    const sessVal = unref(session)
    const quesVal = unref(questions)
    // console.log(quesVal)
    // console.log(sessVal)
    return fields.map((key, index) => {
      const question = quesVal[index].question;
      return {
        question,
        answer: sessVal[key]
      }
    })
  })
}

