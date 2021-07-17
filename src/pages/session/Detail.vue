<template>
  <q-page>
    <div class="q-pa-md">
      <template v-if="session == 'loading'">
        <q-skeleton 
          v-for="i in 6" 
          :key="`skel_${i}`"
          square
          height="3rem"
          class="q-my-md" />
      </template>
      <SessionDetail 
        v-else-if="session._id"
        :session="session" />
      <div v-else-if="session == 'error'"
        class="bg-grey-3 q-pa-xl" 
        style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <q-avatar size="xl" color="red" icon="error"  />
        <div class="text-subtitle1">Terjadi Kesalahan</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { defineProps, toRefs, ref, inject, computed, onMounted, isRef } from 'vue'
  import SessionDetail from 'components/session/SessionDetail.vue'
  import useSingleSession from 'src/serv/session/single'

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  const { id } = toRefs(props)

  const {
    session,
    getSingleSession
  } = useSingleSession()

  onMounted(() => {
    getSingleSession(id.value)
  })
</script>
