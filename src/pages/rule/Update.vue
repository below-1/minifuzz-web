<template>
  <q-page>
    <div class="bg-indigo-7 text-white column items-center q-py-md">
      <q-avatar 
        color="indigo-5"
        text-color="white"
        size="5rem"
        icon="receipt_long" />
      <p class="text-h5 text-weight-bold">Edit Aturan</p>
    </div>
    <q-card v-if="stat == 'done'" flat>
      <q-card-section class="text-center">
        <div class="text-subtitle1">{{ item._id }}</div>
        <div class="text-caption">terakhir diupdate: {{ item.updatedAt }}</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <template v-for="p, index in item.predicate" :key="`${id}_${index}`">
            <div class="q-mb-lg">
              <div>{{ questionsOptions[index].question }}</div>
              <q-option-group
                :options="questionsOptions[index].answers"
                type="radio"
                v-model="item.predicate[index]"
              />
            </div>
          </template>
          <div class="q-mb-lg">
            <div>Jawaban</div>
            <q-option-group
              :options="answersOptions"
              type="radio"
              v-model="item.consequence"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="onSubmit" flat>simpan</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup="props">
  import { onMounted, computed, ref, reactive, watch } from 'vue'
  import useRuleDetailAPI from 'src/serv/rule/detail'
  import updateRule from 'src/serv/rule/update'
  import useQuestions from 'src/serv/question'

  const props = defineProps({
    id: String
  })

  const {
    questions,
    answers,
    questionsLoading: loading,
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

  const {
    item,
    getDetail,
    stat
  } = useRuleDetailAPI()


  watch(item, (it, prev) => {
    console.log('watched item')
    console.log({...it})
  })

  function onSubmit () {
    const predicate = [ ...item.predicate ].join('')
    const consequence = `${item.consequence}`
    updateRule(props.id, predicate, consequence)
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onMounted(() => {
    getQuestions()
      .then(() => {
        return getDetail(props.id)
      })
      .catch(err => {
        console.log(err)
      })
  })
</script>