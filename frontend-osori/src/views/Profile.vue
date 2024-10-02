<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
    >
      <div>
        <h2
          class="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight"
        >
          프로필
        </h2>
      </div>

      <div v-if="profile" class="mt-8 space-y-6">
        <div class="flex justify-center">
          <div
            class="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white"
          >
            {{ profile.name ? profile.name[0].toUpperCase() : '?' }}
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-1">이름</p>
          <p class="text-lg font-medium text-gray-900">{{ profile.name }}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-6 shadow-sm">
          <p class="text-sm text-gray-500 mb-1">이메일</p>
          <p class="text-lg font-medium text-gray-900">{{ profile.email }}</p>
        </div>
      </div>

      <div
        v-if="message"
        class="mt-2 text-sm text-center p-2 rounded-md"
        :class="messageClass"
        role="alert"
      >
        <p class="font-medium">{{ message }}</p>
      </div>

      <div class="mt-6">
        <button
          @click="logout"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const profile = ref(null)
    const message = ref('')
    const messageType = ref('')

    const messageClass = computed(() => {
      return {
        'bg-green-100 text-green-700 border border-green-400':
          messageType.value === 'success',
        'bg-red-100 text-red-700 border border-red-400':
          messageType.value === 'error'
      }
    })

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/users/profile',
          { withCredentials: true }
        )
        profile.value = response.data
      } catch (error) {
        setMessage('프로필 조회 실패: ' + error.response.data, 'error')
      }
    }

    const logout = async () => {
      try {
        await axios.post(
          'http://localhost:8080/api/users/logout',
          {},
          { withCredentials: true }
        )
        router.push('/login')
      } catch (error) {
        setMessage('로그아웃 실패: ' + error.response.data, 'error')
      }
    }

    const setMessage = (msg, type) => {
      message.value = msg
      messageType.value = type
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }

    onMounted(fetchProfile)

    return {
      profile,
      message,
      messageClass,
      logout
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
