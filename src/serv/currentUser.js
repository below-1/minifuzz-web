import { ref } from 'vue'
import { api } from 'boot/axios'

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export default function () {
  const currentUser = ref({
    username: 'username',
    name: '',
    role: 'USER',
    createdAt: null,
    updatedAt: null
  })
  const loading = ref(false)
  const getCurrentUser = async () => {
    loading.value = true
    try {
      const resp = await api.get('/auth/me')
      const { data } = resp
      currentUser.value = {
        ...data
      }
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  return {
    currentUser,
    loading,
    getCurrentUser
  }
}