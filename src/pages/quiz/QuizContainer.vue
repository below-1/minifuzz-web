<template>
  <q-page 
    v-if="loadingRules"
    class="flex justify-center items-center bg-grey-2">
    <q-circular-progress
      indeterminate
      size="10rem"
      :thickness="0.4"
      color="indigo"
      center-color="grey-8"
      class="q-ma-md"
    />
  </q-page>
  <template v-else>
    <Quiz v-if="comp == 'quiz'"
      @submit="onSubmit" />
    <QuizResult 
      v-else-if="comp == 'quiz-result'" 
      @repeat-quiz="onRepeat"
    />
  </template>
</template>

<script setup>
  import { computed, inject, watch, onMounted, reactive, ref } from 'vue'
  import Quiz from './Quiz.vue';
  import QuizResult from './Result.vue'
  import useFuzzy from 'src/serv/fuzz/fuzz';

  const comp = ref('loading')

  function onRepeat() {
    localStorage.removeItem('fuzz.results')
    comp.value = 'quiz'
  }

  const {
    loadingRules,
    run
  } = useFuzzy()

  function onSubmit(payload) {
    const input = [
      payload.matchMakingPerDay,
      payload.increaseDuration,
      payload.runwayIntensity,
      payload.angerWhenStopped,
      payload.desireToReplay,
      payload.sideEffectAwareness,
      payload.procrastination,
      payload.gamingCost
    ]
    const results = run(input)
    localStorage.setItem('fuzz.results', JSON.stringify(results))
    comp.value = 'quiz-result'
  }

  onMounted(() => {
    const raw = localStorage.getItem('fuzz.results')
    if (raw) {
      comp.value = 'quiz-result'
    } else {
      comp.value = 'quiz'
    }
  })
</script>
