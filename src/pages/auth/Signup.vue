<template>
  <q-page class="flex flex-center">
    <div>
      <div class="text-center q-mb-md">
        <q-icon color="yellow-8" size="6rem" name="lock"></q-icon>
        <h5 class="text-weight-bold q-my-none">Mini - Fuzz</h5>
      </div>

      <q-form ref="form">
        <q-input 
          label="username" 
          v-model="payload.name" 
          class="q-mb-sm" />
        <q-input 
          label="username" 
          v-model="payload.username" 
          :rules="[
            v => (v && v.length > 6) || 'username harus lebih dari 6 karakter'
          ]"
          class="q-mb-sm" />
        <q-input
          type="password" 
          v-model="payload.password" 
          :rules="[
            v => (v && v.length > 6) || 'password harus lebih dari 6 karakter'
          ]"
          label="password" />
        <q-input 
          type="password" 
          v-model="confirmPassword" 
          :rules="[
            v => v == payload.password || 'password tidak sama'
          ]"
          label="Ulangi Password" />
      </q-form>

      <div class="q-gutter-sm">
        <q-radio dense v-model="payload.role" val="USER" label="User" />
        <q-radio dense v-model="payload.role" val="ADMIN" label="Admin" />
      </div>
      <div class="text-center q-my-xl">
        <q-btn 
          @click="onSubmit"
          unelevated 
          color="yellow-8" 
          size="lg" 
          label="Daftar" 
          class="text-weight-bold text-black"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { reactive, ref, computed } from 'vue'
  import { api } from 'boot/axios'
  import { useRouter } from 'vue-router'

  const form = ref(null);
  const payload = reactive({
    name: '',
    username: '',
    password: '',
    role: 'USER',
  })
  const confirmPassword = ref('');
  const passwordMatch = computed(() => confirmPassword.value == payload.password);

  const router = useRouter()

  function onSubmit () {
    api.post('/auth/signup', payload)
      .then(resp => {
        const token = resp.data
        router.replace('/auth/login')
      })
      .catch(err => {
        console.log(err)
      })
  }
</script>
