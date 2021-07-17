<template>
  <router-view/>
</template>

<script setup>
  import { provide, onMounted } from 'vue'
  import useQuestions from 'src/serv/question'
  import { formatDate, formatOutputBuilder } from 'src/serv/session/format'

  const {
    questions,
    answers,
    getQuestions,
    loading: questionsLoading
  } = useQuestions()

  provide('formatSession', {
    getFormatDate: () => formatDate,
    getFormatOutput: () => formatOutputBuilder({ questions: questions.value, answers: answers.value })
  })
  provide('questions', questions)
  provide('answers', answers)

  onMounted(async () => {
    await getQuestions()
  })
</script>
