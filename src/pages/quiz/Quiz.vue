<template>
  <q-page>
    <Hero
      title="Quiz"
      :subtitle="`Hai, ${currentUser.username}!! Jawab semua pertanyaaan dibawah untuk mengetahui tingkat kecanduan online game anda`" />
    <div class="row flex-center">
      <div class="col-md-6 col-sm-12 q-px-md">

        <template v-for="field in fields" :key="field.name">
          <q-card class="q-my-lg">
            <q-card-section>
              <div class="text-h6 text-grey-8 text-center">
                {{field.label}}
              </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <q-slider
                v-model.number="payload[field.name]"
                label
                :min="field.min"
                :max="field.max"
                :step="field.step" />
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div class="text-weight-bold text-center text-grey-10">
                {{ payload[field.name] }}
              </div>
            </q-card-section>
          </q-card>
        </template>

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
        
      </div>
    </div>
  </q-page>
</template>

<style scoped>
  .q-slider__track-container--h {
    height: 10px;
    margin-top: -5px;
  }

  .q-slider__thumb {
    top: -50%;
    height: 40px;
    width: 40px;
  }

  .hero {
    background-image: linear-gradient(to bottom, #111A, #111B), url(/hero-2.jpg);
    background-attachment: fixed;
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
  import Hero from 'components/Hero.vue'

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

