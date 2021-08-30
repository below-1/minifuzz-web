<template>
  <q-page>
    <Hero
      title="Quiz"
      subtitle="Hasil Prediksi Sistem" />

    <q-card flat>
      <q-card-section class="text-center">
        <q-btn 
          @click="$emit('repeat-quiz')"
          size="lg" flat dark color="indigo" label="ulangi quiz" />
      </q-card-section>
      <q-card-section>
        <template v-if="formattedResult.length >= 3">
          <div class="text-center">
            <h4 class="q-ma-none">
              Anda Mengalami Kecanduan Game
            </h4>
            <h6 class="q-ma-none">Silahkan berkonsultasi dengan dokter</h6>
            <div class="q-my-md" v-for="fr, i in formattedResult" :key="`result_${i}`">
              <div class="text-h4 text-weight-bold q-my-none">{{ fr.label }}</div>
              <div class="text-h5 q-my-none">{{ fr.confidence }}</div>
            </div>
          </div>
        </template>
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
    const ntop = results.length >= 3 ? 3 : results.length
    let taken = 0
    let formattedResults = []
    while (taken < ntop) {
      let r = results[taken]
      formattedResults.push({
        confidence: `${(r.confidence * 100).toFixed(2)} %`,
        label: answers.value[r.consequence]
      })
      taken += 1
    }
    return formattedResults
    // let max = 0;
    // let maxOuts = [];
    // const eps = 0.00001;
    // for (let r of results) {
    //   if (r.confidence > max) {
    //     max = r.confidence;
    //   }
    // }
    // for (let r of results) {
    //   if (Math.abs(r.confidence - max) < eps) {
    //     maxOuts.push(r);
    //   }
    // }
    // // console.log(maxOuts);
    // const formatted = maxOuts.map(r => {
    //   return {
    //     confidence: `${(r.confidence * 100).toFixed(2)} %`,
    //     label: answers.value[r.consequence]
    //   }
    // });
    // return formatted;
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
