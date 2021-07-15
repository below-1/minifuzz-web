<template>
  <q-page>
    <div class="bg-indigo-7 text-white column items-center q-pa-md text-center">
      <q-avatar 
        color="indigo-5"
        text-color="white"
        size="5rem"
        icon="receipt_long" />
      <p class="text-h5 text-weight-bold">Quiz</p>
      <p class="text-body">Hai, {{ currentUser.name }}!! Jawab semua pertanyaaan dibawah untuk mengetahui tingkat kecanduan online game anda</p>
    </div>

    <q-card flat>
      <q-card-section>
        <q-form>
          <div 
            v-for="field in fields" 
            :key="field.name"
            class="q-my-xl text-center">
            <div class="text-subtitle2 text-grey-8">
              {{field.label}}
            </div>
            <q-slider
              v-model.number="payload[field.name]"
              label
              :min="field.min"
              :max="field.max"
              :step="field.step" />
            <div class="text-weight-bold text-grey-10">
              {{ payload[field.name] }}
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <div class="text-center q-py-lg">
      <q-btn
        @click="onSubmit"
        :disabled="!predicateValid"
        color="primary"
        size="lg"
        unelevated
        label="hasil"
      />
    </div>
  </q-page>
</template>

<style>
  .q-slider__track-container--h {
    height: 10px;
    margin-top: -5px;
  }

  .q-slider__thumb {
    top: -50%;
    height: 40px;
    width: 40px;
  }
</style>

<script setup>
  import { 
    computed, 
    inject, 
    watch, 
    onMounted, 
    reactive, 
    ref, 
    defineEmit,
    useContext,
  } from 'vue'
  import useQuestions from 'src/serv/question'
  import useQuestionOptions from 'src/serv/optionize'
  import { defaultSession } from 'src/serv/defaults'
  import { fields } from './data'

  defineEmit(['submit']);
  const { emit } = useContext();

  const startTime = new Date()
  const props = defineProps({
    userId: String
  })
  const currentUser = inject('currentUser')
  const {
    questions,
    answers,
    loading: questionLoading,
    getQuestions
  } = useQuestions()

  const payload = reactive({
    matchMakingPerDay: 0,
    increaseDuration: 0,
    runwayIntensity: 0,
    angerWhenStopped: 0,
    desireToReplay: 0,
    sideEffectAwareness: 0,
    procrastination: 0,
    gamingCost: 0
  })

  const predicateValid = computed(() => {
    let _p = { ...payload }
    const result = Object.keys(_p).every(key => {
      return !isNaN(_p[key])
    })
    return result
  })

  const {
    questions: questionsOptions,
    answers: answersOptions
  } = useQuestionOptions(questions, answers)

  function onSubmit() {
    const endTime = new Date()
    const postPayload = {
      ...payload,
      start: startTime,
      end: endTime
    }
    emit('submit', postPayload);

    // const input = [
    //   payload.matchMakingPerDay,
    //   payload.increaseDuration,
    //   payload.runwayIntensity,
    //   payload.angerWhenStopped,
    //   payload.desireToReplay,
    //   payload.sideEffectAwareness,
    //   payload.procrastination,
    //   payload.gamingCost
    // ]
    // const results = run(input)
    // localStorage.setItem('fuzz.results', JSON.stringify(results))
    // console.log(results)
  }

  onMounted(() => {
    getQuestions()
  })
</script>

