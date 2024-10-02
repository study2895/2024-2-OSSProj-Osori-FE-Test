<template>
  <div class="min-h-screen font-sans flex flex-col bg-white">
    <header class="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div class="container mx-auto">
        <nav class="flex justify-end space-x-4">
          <router-link
            to="/portfolios/new"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <span class="mr-2">✨</span> 새 포트폴리오
          </router-link>
          <router-link
            to="/portfolios/tag"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
          >
            <span class="mr-2">🔍</span> 태그 검색
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            <span class="block">당신의 작품을 세상에 선보이세요</span>
            <span
              class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
            >
              포트폴리오 관리
            </span>
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            당신의 창의성과 열정을 담은 포트폴리오로 새로운 기회를 만나보세요.
            간편하고 세련된 방식으로 당신의 작품을 관리하고 공유할 수 있습니다.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <router-view></router-view>
        </div>
      </div>
    </main>

    <footer class="bg-gray-50 text-gray-600 py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm">
          &copy; 2024 포트폴리오 관리 시스템. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}

.router-link-active {
  opacity: 0.8;
  transform: translateY(1px);
}
</style>
