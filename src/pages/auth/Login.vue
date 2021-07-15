<template>
  <q-page class="flex flex-center bg-red-9">
    <div>
      <div class="text-center q-mb-md">
        <q-icon color="white" size="6rem" name="lock"></q-icon>
        <h5 class="text-weight-bold text-white q-my-none">Mini - Fuzz</h5>
      </div>
      <q-input dark label="username" color="white" v-model="payload.username" class="q-mb-sm" />
      <q-input dark type="password" color="white" v-model="payload.password" label="password" />
      <div class="text-center q-my-xl">
        <q-btn 
          @click="login"
          unelevated 
          color="yellow-8" 
          size="lg" 
          label="login" 
          class="text-weight-bold text-black"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { reactive } from 'vue'
  import { api } from 'boot/axios'
  import { useRouter } from 'vue-router'

  const payload = reactive({
    username: '',
    password: ''
  })

  const router = useRouter()

  function login () {
    api.post('/auth/login', payload)
      .then(resp => {
        const token = resp.data
        localStorage.setItem('token', token)
        router.replace('/app')
      })
      .catch(err => {
        console.log(err)
      })
  }
</script>