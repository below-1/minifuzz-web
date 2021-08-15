<template>
  <q-page>
    <Hero
      title="Daftar Sesi"
      subtitle="Rekaman sesi yang pernah anda lakukan"
    />

    <div v-if="!loading" class="row flex-center q-my-md">
      <div class="col-md-8 col-sm-12">
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
    </div>

  </q-page>
</template>

<script setup>
  import { provide, inject, onMounted, computed, ref } from 'vue'
  import { api } from 'boot/axios'
  import useQuestions from 'src/serv/question'
  import useListSession from 'src/serv/session/list'
  import SessionListItem from 'components/session/SessionListItem.vue'
  import Hero from 'components/Hero.vue'

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
