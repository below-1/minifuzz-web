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
  </q-page>
</template>

<script setup>
  import { computed, onMounted, inject } from 'vue'
  import useSessionListAPI from 'src/serv/session/list'

  const currentUser = inject('currentUser')

  const props = defineProps({
    userId: String
  })

  const {
    items,
    totalPage,
    params,
    getSession
  } = useSessionListAPI()


  onMounted(() => {
    getSession()
  })
</script>