<template>
  <Loading v-if="userLoading" />
  <q-layout v-else view="hHh lpr fFf">
    <q-header>
      <q-toolbar class="bg-white text-blue-9" style="border-bottom: 1px solid #eee;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          MiniFuzz
        </q-toolbar-title>

        <q-space/>

        <q-btn
          flat
          dense
          icon="person"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-1"
    >
      <div class="row q-px-md q-py-md" style="border-bottom: solid #ccc 1px;">
        <q-avatar size="lg" color="indigo" text-color="white" icon="person" class="q-mr-sm">
        </q-avatar>
        <div>
          <div>{{ currentUser.username }} / {{ currentUser.name }}</div>
          <div>role: {{ currentUser.role }}</div>
        </div>
      </div>
      <q-list separator>
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
            <q-item-label>{{ menu.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-footer>
      <q-toolbar class="bg-grey-2 text-grey-9">
        <span class="text-overline text-center q-px-md" style="line-height: 120%;">
          &copy; 2021 Mini-Fuzz, created by Inggris Clesia Clesia Ambesa
        </span>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, computed, onMounted, provide } from 'vue'
  import useCurrentUser from 'src/serv/currentUser'
  import Loading from 'components/Loading.vue'

  const leftDrawerOpen = ref(false)
  const {
    currentUser,
    loading: userLoading,
    getCurrentUser
  } = useCurrentUser()
  provide('currentUser', currentUser)

  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value
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