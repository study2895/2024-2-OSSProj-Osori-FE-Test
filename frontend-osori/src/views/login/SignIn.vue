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
          로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          또는
          <router-link
            to="/auth/verifyemail"
            class="font-medium text-black hover:text-gray-800 transition-colors duration-200"
          >
            새 계정 만들기
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >이메일</label
            >
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="이메일을 입력하세요"
              @input="validateEmail"
            />
            <!-- 간단하고 세련된 이메일 오류 메시지 -->
            <transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <p
                v-if="emailError"
                class="mt-2 text-sm text-red-600 font-medium"
              >
                {{ emailError }}
              </p>
            </transition>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >비밀번호</label
            >
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
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              @click.prevent="forgotPassword"
              class="font-medium text-black hover:text-gray-800 transition-colors duration-200"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
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
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            로그인
          </button>
        </div>

        <!-- 향상된 에러 메시지 출력 -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="message"
            class="mt-2 bg-red-50 border-l-4 border-red-400 p-4 rounded-md"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '', // 에러 메시지 변수
      emailError: '', // 이메일 오류 메시지
      rememberMe: false // 로그인 상태 유지 체크박스
    }
  },
  methods: {
    ...mapActions(['login']), // Vuex 액션을 맵핑

    async handleLogin() {
      if (this.emailError) {
        return // 이메일 오류가 있을 경우 로그인 진행 안 함
      }
      const result = await this.login({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }) // Vuex 액션 호출
      if (!result.success) {
        console.log(result)
        this.message = result.message // 에러 메시지 설정
      } else {
        this.message = '' // 로그인 성공 시 메시지 초기화
        this.$router.push('/profile') // 로그인 후 프로필 페이지로 이동
      }
    },
    validateEmail() {
      // 이메일 형식 검증
      const regex = /^[a-zA-Z0-9._%+-]+@dgu\.ac\.kr$/ // @dgu.ac.kr 도메인 검증
      if (!regex.test(this.email)) {
        this.emailError = '이메일은 @dgu.ac.kr 도메인을 사용해야 합니다.'
      } else {
        this.emailError = '' // 오류가 없을 경우 초기화
      }
    },
    forgotPassword() {
      // 비밀번호 찾기 로직 구현
      console.log('비밀번호 찾기 기능 실행')
      // 여기에 비밀번호 찾기 로직을 추가하세요.
      // 예: this.$router.push('/forgot-password')
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
