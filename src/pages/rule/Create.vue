<template>
  <q-page>
    <Hero
      title="Tambah Data Aturan"
      subtitle="Aturan baru yang digunakan dalam inferensi" />

    <div class="row flex-center">
      <div class="col-md-6 col-sm-12 q-px-md">
        <q-card flat>
          <q-card-section>
            <q-form>
              <template 
                v-for="q, index in questions" 
                :key="`question_${index}`">
                <div class="q-mb-lg">
                  <div>{{ questionsOptions[index].question }}</div>
                  <q-option-group
                    :options="questionsOptions[index].answers"
                    type="radio"
                    v-model="payload.predicate[index]"
                  />
                </div>
              </template>
              <div class="q-mb-lg">
                <div>Jawaban</div>
                <q-option-group
                  :options="answersOptions"
                  type="radio"
                  v-model="payload.consequence"
                />
              </div>
            </q-form>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn @click="onSubmit" color="blue" size="lg" flat>simpan</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { onMounted, computed, ref, reactive, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { api } from 'boot/axios'
  import useQuestions from 'src/serv/question'
  import Hero from 'components/Hero.vue'

  const router = useRouter()

  const {
    questions,
    answers,
    loading: questionLoading,
    getQuestions
  } = useQuestions()
  const questionsOptions = computed(() => {
    return questions.value.map(_q => {
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
  const answersOptions = computed(() => {
    const as = [ ...answers.value ]
    return as.map((a, index) => ({
      value: index,
      label: a
    }))
  })
  const payload = reactive({
    predicate: [0,0,0,0,0,0,0,0],
    consequence: 0
  })

  function onSubmit () {
    const _payload = {
      predicate: [...payload.predicate].join(''),
      consequence: `${payload.consequence}`
    }
    api.post('/v1/api/rule', { ..._payload })
      .then(resp => {
        console.log(resp.data)
        router.push('/app/rules')
      })
      .catch(err => {
        console.log(err)
      })
  }

  onMounted(() => {
    getQuestions()
  })
</script>