<template>
  <q-btn
    flat
    dense
    icon="person"
  >
    <q-menu>
      <div class="bg-white">
        <div class="row items-center q-pa-md">
          <div class="q-mr-md">
            <q-icon size="xl" name="person" />
          </div>
          <div>
            <div class="text-h6">{{ user.username }}</div>
            <div>Role: {{ user.role }}</div>
          </div>
        </div>
        <q-list separator>
          <q-item>
            <q-item-section avatar>
              <q-icon name="https" />
            </q-item-section>
            <q-item-section>
              <q-item-label>ganti password</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="onLogout">
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section>
              <q-item-label>logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup>
  import { defineProps, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { logout } from 'src/serv/currentUser';

  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  });

  const router = useRouter();

  function onLogout() {
      // Remove token
      logout();
      // Redirect to login
      router.replace('/auth/login');
  }

  const { user, loading } = toRefs(props);
</script>
