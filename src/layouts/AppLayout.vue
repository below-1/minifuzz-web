<template>
  <Loading v-if="userLoading" />
  <q-layout v-else view="hHh Lpr lff">
    <q-header elevated dark>
      <q-toolbar class="bg-purple-10">
        <q-btn
          round
          flat
          class="q-mr-md"
          @click="toggleLeftDrawer"
        >
          <q-icon name="timeline" color="white"></q-icon>
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
          <q-icon name="settings_power" color="white" class="q-mr-sm"></q-icon>
          <span>log out</span>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      :mini="leftDrawerMini"
      show-if-above
      bordered
      class="bg-grey-2 text-grey-9"
    >
      <q-list>
        <q-item
          clickable
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.path"
        >
          <q-item-section
            v-if="menu.icon"
            avatar
          >
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-capitalize">{{ menu.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-footer>
      <q-toolbar class="bg-grey-2 text-grey-9">
        <div class="text-overline text-center q-px-md" style="line-height: 120%;">
          &copy; 2021 Mini-Fuzz, created by Inggris Clesia Clesia Ambesa
        </div>
      </q-toolbar>
    </q-footer>
    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, computed, onMounted, provide } from 'vue'
  import useCurrentUser from 'src/serv/currentUser'
  import Loading from 'components/Loading.vue'
  import UserButton from 'components/UserButton.vue'

  const leftDrawerOpen = ref(false)
  const leftDrawerMini = ref(false)
  const {
    currentUser,
    loading: userLoading,
    getCurrentUser
  } = useCurrentUser()
  provide('currentUser', currentUser)

  function toggleLeftDrawer () {
    leftDrawerMini.value = !leftDrawerMini.value
  }

  const menus = computed(() => {
    if (currentUser.value.role == 'USER') {
      return [
        { path: '/app', title: 'beranda', icon: 'home' },
        { path: '/app/quiz', title: 'quiz', icon: 'quiz' },
        { path: '/app/sessions', title: 'sesi', icon: 'emoji_food_beverage' },
        { path: '/app/about', title: 'tentang', icon: 'description' }
      ]
    } else {
      return [
        { path: '/app', title: 'beranda', icon: 'home' },
        { path: '/app/quiz', title: 'quiz', icon: 'quiz' },
        { path: '/app/sessions', title: 'sesi', icon: 'emoji_food_beverage' },
        { path: '/app/rules', title: 'aturan', icon: 'receipt_long' },
        { path: '/app/about', title: 'tentang', icon: 'description' }
      ]
    }
  })

  onMounted(() => {
    getCurrentUser()
  })
</script>