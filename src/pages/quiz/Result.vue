<template>
  <q-page>
    <Hero
      title="Quiz"
      subtitle="Hasil Prediksi Sistem" />

    <q-card flat class="text-white" v-bind:class="[avg ? 'bg-red-9' : 'bg-purple-9']">
      <q-card-section class="text-center">
        <q-btn 
          @click="$emit('repeat-quiz')"
          size="lg" unelevated label="ulangi quiz" />
      </q-card-section>
      <q-card-section>
        <template v-if="formattedResult.length >= 0">
          <div class="text-center">
            <h4 class="q-ma-none">
              Anda Mengalami Kecanduan Game
            </h4>

            <h6 class="q-ma-none">Silahkan berkonsultasi dengan dokter</h6>
            <div class="q-my-md" v-if="avg">
              <div class="text-h5 q-my-none">{{ avg.toFixed(2) }}</div>
            </div>

            <!-- <h6 class="q-ma-none">Silahkan berkonsultasi dengan dokter</h6>
            <div class="q-my-md" v-for="fr, i in formattedResult" :key="`result_${i}`">
              <div class="text-h4 text-weight-bold q-my-none">{{ fr.label }}</div>
              <div class="text-h5 q-my-none">{{ fr.confidence }}</div>
            </div> -->

          </div>
        </template>

        <h4 v-else class="q-ma-none">
          Anda tidak memiliki prilaku Kecanduan Game
        </h4>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
  import { computed, inject, watch, onMounted, reactive, ref, defineEmit } from 'vue'
  import useQuestions from 'src/serv/question'
  import { fields } from './data'
  import Hero from 'components/Hero.vue'

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
    let parsed = JSON.parse(raw)
    let sorted = parsed.sort((a, b) => {
      return a.confidence > b.confidence ? -1 : 1
    })
    results.value = sorted
  }

  function calculateTopOutput(results) {
    const filteredResults = results.filter(r => r.confidence > 50)
    const ntop = filteredResults.length
    // const ntop = filteredResults.length >= 3 ? 3 : filteredResults.length
    let taken = 0
    let formattedResults = []
    while (taken < ntop) {
      let r = filteredResults[taken]
      formattedResults.push({
        confidence: `${r.confidence.toFixed(2)}`,
        label: answers.value[r.consequence]
      })
      taken += 1
    }
    return formattedResults
  }

  function repeatQuiz() {
    localStorage.removeItem('fuzz.results')
  }

  const formattedResult = computed(() => calculateTopOutput(results.value))

  const avg = computed(() => {
    const frs = results.value
    if (!frs.length) return null;
    const total = frs
      .map(it => parseFloat(it.confidence))
      .reduce((a, b) => a + b, 0)
    return (total / frs.length)
  })

  onMounted(async () => {
    try {
      await getQuestions()
      loadSavedResults()
    } catch (err) {
      console.log(err)
    }
  })
</script>
