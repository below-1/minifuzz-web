<template>
  <q-page>
    <div class="bg-indigo-7 text-white column items-center q-py-md">
      <q-avatar 
        color="indigo-5"
        text-color="white"
        size="5rem"
        icon="receipt_long" />
      <p class="text-h5 text-weight-bold">Daftar Sesi</p>
    </div>

    <div v-if="!loading">
      <q-list separator flat>
        <template v-for="session in items" :key="session._id">
          <!-- <div>{{ session.start }}</div> -->
          <SessionListItem
            :id="session._id"
            :start="session.start"
            :end="session.end"
            :outputs="session.outputs"/>
        </template>
      </q-list>
    </div>

  </q-page>
</template>

<script setup>
  import { provide, inject, onMounted, computed, ref } from 'vue'
  import { api } from 'boot/axios'
  import useQuestions from 'src/serv/question'
  import useListSession from 'src/serv/session/list'
  import SessionListItem from 'components/session/SessionListItem.vue'

  const { currentUser } = inject('currentUser')
  // const format = inject('formatSession')
  // const formatOutput = format.getFormatOutput()
  // const formatDate = format.getFormatDate()
  // const {
  //   questions,
  //   answers,
  //   getQuestions,
  //   loading: questionsLoading
  // } = useQuestions();

  // provide('formatSession', {
  //   getFormatDate: () => formatDate,
  //   getFormatOutput: () => {
  //     console.log('loading = ', loading.value)
  //     console.log('answers = ', answers.value)
  //     console.log(items.value);
  //     return formatOutputBuilder({ questions: questions.value, answers: answers.value });
  //   }
  // })

  const {
    items,
    totalPage,
    params,
    loading,
    getSession
  } = useListSession()
  
  onMounted(async () => {
    // await getQuestions();
    await getSession();
  });
</script>
