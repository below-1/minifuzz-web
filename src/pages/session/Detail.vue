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
      <div v-else-if="session._id" class="row flex-center">
        <div class="col-sm-12 col-md-6">
          <SessionDetail 
            :session="session" 
            @delete="onDelete"/>
        </div>
      </div>
      <div v-else-if="session == 'error'"
        class="bg-grey-3 q-pa-xl" 
        style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <q-avatar size="xl" color="red" icon="error"  />
        <div class="text-subtitle1">Terjadi Kesalahan</div>
      </div>
    </div>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Anda akan menghapus sesi</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batalkan" color="primary" v-close-popup />
          <q-btn @click="realDelete" flat label="Lanjutkan" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
  import { defineProps, reactive, toRefs, ref, inject, computed, onMounted, isRef } from 'vue'
  import { useRouter } from 'vue-router'
  import SessionDetail from 'components/session/SessionDetail.vue'
  import useSingleSession from 'src/serv/session/single'
  import removeSession from 'src/serv/session/remove'

  const router = useRouter()

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  const { id } = toRefs(props)
  const deleteDialog = ref(false)
  function onDelete() {
    deleteDialog.value = true
  }
  async function realDelete() {
    try {
      await removeSession(id.value)
      router.replace('/app/sessions')
    } catch (err) {
      console.log(err)
    }
  }

  const {
    session,
    getSingleSession
  } = useSingleSession()

  onMounted(() => {
    getSingleSession(id.value)
  })
</script>
