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
          회원가입
        </h2>
        <div class="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p class="text-center text-sm text-gray-600">
            이메일: <span class="font-medium text-black">{{ email }}</span>
          </p>
        </div>
        <p class="mt-4 text-center text-sm text-gray-600">
          추가 정보를 입력하여 회원가입을 완료하세요.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="completeSignup">
        <!-- 실명 입력 -->
        <div class="space-y-1">
          <label for="realName" class="block text-sm font-medium text-gray-700">
            실명
          </label>
          <input
            v-model="realName"
            id="realName"
            name="realName"
            type="text"
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="실명을 입력하세요"
          />
        </div>
        <!-- 닉네임 입력 -->
        <div class="space-y-1">
          <label for="nickname" class="block text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            v-model="nickname"
            id="nickname"
            name="nickname"
            type="text"
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <!-- 비밀번호 입력 -->
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <!-- 비밀번호 확인 -->
        <div class="space-y-1">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
          >
            비밀번호 확인
          </label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <!-- 회원가입 완료 버튼 -->
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
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
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            회원가입 완료
          </button>
        </div>
      </form>

      <!-- 메시지 표시 -->
      <div
        v-if="message"
        class="mt-2 text-sm text-center p-3 rounded-md transition-all duration-300"
        :class="messageClass"
        role="alert"
      >
        <p class="font-medium">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const router = useRouter()
    const email = ref(localStorage.getItem('email') || '')
    const nickname = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const message = ref('')

    const messageClass = computed(() => {
      return message.value.includes('완료')
        ? 'bg-green-100 text-green-700 border border-green-400'
        : 'bg-red-100 text-red-700 border border-red-400'
    })

    const completeSignup = async () => {
      if (password.value !== confirmPassword.value) {
        message.value = '비밀번호가 일치하지 않습니다.'
        return
      }

      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup',
          {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
            authCode: localStorage.getItem('authCode')
          }
        )
        message.value = '회원가입이 완료되었습니다!'
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (error) {
        message.value =
          '회원가입 실패: ' + (error.response?.data || error.message)
      }
    }

    return {
      email,
      nickname,
      password,
      confirmPassword,
      message,
      messageClass,
      completeSignup
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
