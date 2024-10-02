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
        <p class="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link
            to="auth/signin"
            class="font-medium text-black hover:text-gray-800 transition-colors duration-200"
            >로그인</router-link
          >
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="signup">
        <!-- 이메일 입력 -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >이메일 주소</label
          >
          <div class="flex space-x-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              required
              @input="validateEmail"
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="이메일을 입력하세요"
            />
            <button
              @click.prevent="sendEmailVerification"
              class="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
            >
              인증 코드 보내기
            </button>
          </div>
          <!-- 간단하고 세련된 이메일 오류 메시지 -->
          <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <p v-if="emailError" class="mt-2 text-sm text-red-600 font-medium">
              {{ emailError }}
            </p>
          </transition>
        </div>

        <!-- 인증 코드 입력 -->
        <div v-if="isEmailSent" class="space-y-2">
          <label
            for="verificationCode"
            class="block text-sm font-medium text-gray-700"
            >인증 코드</label
          >
          <div class="flex space-x-2">
            <input
              v-model="verificationCode"
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="이메일로 받은 인증 코드를 입력하세요"
            />
            <button
              @click.prevent="verifyCode"
              class="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
            >
              인증 확인
            </button>
          </div>
        </div>

        <!-- 비밀번호 입력 -->
        <div v-if="isVerified" class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700"
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

        <!-- 회원가입 버튼 -->
        <div v-if="isVerified">
          <button
            @click.prevent="signup"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            회원가입
          </button>
        </div>
      </form>

      <!-- 메시지 표시 -->
      <div
        v-if="message"
        class="mt-2 text-sm text-center p-2 rounded-md"
        :class="messageClass"
        role="alert"
      >
        <p class="font-medium">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      verificationCode: '',
      password: '',
      isEmailSent: false,
      isVerified: false,
      message: '',
      emailError: '' // 이메일 오류 메시지
    }
  },
  methods: {
    validateEmail() {
      const regex = /^[a-zA-Z0-9._%+-]+@dgu\.ac\.kr$/ // @dgu.ac.kr 도메인 검증
      if (!regex.test(this.email)) {
        this.emailError = '이메일은 @dgu.ac.kr 도메인을 사용해야 합니다.'
      } else {
        this.emailError = '' // 오류가 없을 경우 초기화
      }
    },
    async sendEmailVerification() {
      if (this.emailError) return // 이메일 오류가 있을 경우 전송하지 않음
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup/send-email',
          { email: this.email }
        )
        this.isEmailSent = true
        this.message = response.data
      } catch (error) {
        this.message = '이메일 전송 실패: ' + error.response.data
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup/verify-code',
          {
            email: this.email,
            code: this.verificationCode
          }
        )
        this.isVerified = true
        this.message = response.data
      } catch (error) {
        this.message = '인증 실패: ' + error.response.data
      }
    },
    async signup() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/users/signup',
          {
            email: this.email,
            password: this.password,
            authCode: this.verificationCode
          }
        )
        this.message = response.data
      } catch (error) {
        this.message = '회원가입 실패: ' + error.response.data
      }
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
