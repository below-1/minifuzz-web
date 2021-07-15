<template>
  <q-page>
    <div class="bg-indigo-7 text-white column items-center q-pa-md text-center">
      <q-avatar 
        color="indigo-5"
        text-color="white"
        size="5rem"
        icon="receipt_long" />
      <p class="text-h5 text-weight-bold">Hasil Quiz</p>
      <p class="text-body">Hai, {{ currentUser.name }}!! Hasil Quiz Kamu</p>
    </div>

    <q-card flat>
      <q-card-section class="text-center">
        <q-btn 
          @click="$emit('repeat-quiz')"
          size="lg" flat dark color="indigo" label="ulangi quiz" />
      </q-card-section>
      <q-card-section>
        <div class="text-center q-my-md" v-for="fr, i in formattedResult" :key="`result_${i}`">
          <div class="text-h4 text-weight-bold q-my-none">{{ fr.label }}</div>
          <div class="text-h5 q-my-none">{{ fr.confidence }}</div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
  import { computed, inject, watch, onMounted, reactive, ref, defineEmit } from 'vue'
  import useQuestions from 'src/serv/question'
  import { fields } from './data'

  defineEmit(['repeat-quiz']);

  const {
    questions,
    answers,
    loading: questionLoading,
    getQuestions
  } = useQuestions()
  const results = ref([])
  const currentUser = inject('currentUser')

  function loadSavedResults() {
    const raw = localStorage.getItem('fuzz.results')
    if (!raw) {
      throw new Error('fail to load saved results');
    }
    results.value = JSON.parse(raw)
  }

  function calculateTopOutput(results) {
    let max = 0;
    let maxOuts = [];
    const eps = 0.00001;
    for (let r of results) {
      if (r.confidence > max) {
        max = r.confidence;
      }
    }
    for (let r of results) {
      if (Math.abs(r.confidence - max) < eps) {
        maxOuts.push(r);
      }
    }
    // console.log(maxOuts);
    const formatted = maxOuts.map(r => {
      return {
        confidence: `${(r.confidence * 100).toFixed(2)} %`,
        label: answers.value[r.consequence]
      }
    });
    return formatted;
  }

  function repeatQuiz() {
    localStorage.removeItem('fuzz.results')
  }

  const formattedResult = computed(() => calculateTopOutput(results.value))

  onMounted(async () => {
    try {
      await getQuestions()
      loadSavedResults()
    } catch (err) {
      console.log(err)
    }
  })
</script>
