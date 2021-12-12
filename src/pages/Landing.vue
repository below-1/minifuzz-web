<template>
  <q-page>
    <div class="hero column text-white">
      <q-toolbar class="col-1 bg-purple-10">
        <q-btn
          flat
          class="q-mr-md"
        >
          <q-icon name="timeline" size="xl" color="white"></q-icon>
        </q-btn>
        <p class="text-subtitle1 q-my-none">
        Sistem Pendukung Keputusan Menggunakan Metode Fuzzy Mamdani
        </p>
        <q-space/>
        <q-btn
          flat
          color="white"
          to="/auth/login"
        >
          <q-icon name="person" color="white" class="q-mr-sm"></q-icon>
          <span>sign in</span>
        </q-btn>
      </q-toolbar>
      <div class="col column justify-center items-center">
        <q-icon name="timeline" size="10rem" color="white" class="dot"></q-icon>
      </div>
      <div 
        class="col-4 text-center column justify-center items-center" 
        style="background: rgba(0, 0, 0, 0.5);">
        <h2 class="text-weight-bolder q-my-none">Minifuzz</h2>
        <h5 class="text-weight-bold q-my-none">Diagnosa Kecanduan Game Online</h5>
        <!-- <q-btn 
          to="/auth/login"
          size="lg" color="purple" dark class="text-weight-bold" unelevated>Login</q-btn> -->
      </div>
    </div>

    <!-- <div class="q-px-lg q-py-xl">
      <div class="row q-col-gutter-lg">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="col-xs-12 col-md-4 text-center">
          <q-icon size="xl" :name="feature.icon" :color="feature.color"></q-icon>
          <p class="text-h6">{{ feature.title }}</p>
          <p class="caption q-px-lg">{{ feature.text }}</p>
        </div>
      </div>
    </div> -->
  </q-page>
</template>

<style scoped>
 .hero {
  height: 100vh;
  width: 100%;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url(/hero-bg.jpg);
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
 }

 .dot {
  animation: pulse-white 2s infinite;
 }

 @keyframes pulse-white {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
</style>

<script setup>
  import Logo from 'components/Logo.vue'

  const iconSize = 200
  const features = [
    {
      title: 'Speed',
      icon: 'favorite',
      color: 'indigo',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    },
    {
      title: 'Persistence',
      icon: 'face',
      color: 'yellow',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    },
    {
      title: 'Recurrence',
      icon: 'visibility',
      color: 'pink',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    },
    {
      title: 'Brave',
      icon: 'star_rate',
      color: 'orange',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    },
    {
      title: 'Perseverance',
      icon: 'description',
      color: 'cyan',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    },
    {
      title: 'Relentless',
      icon: 'work',
      color: 'teal',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium turpis nibh. Morbi auctor lobortis urna vel efficitur. Nam fringilla, sapien vel consequat vestibulum, mauris mi sagittis odio, vel convallis diam dolor vel lectus. Donec pellentesque libero a pulvinar convallis.'
    }
  ]
</script>