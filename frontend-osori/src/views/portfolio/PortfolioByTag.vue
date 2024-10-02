<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 flex flex-col justify-center sm:py-12 font-sans"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-600 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
          태그로 검색
        </h2>

        <div class="mb-6">
          <label
            for="searchTag"
            class="block text-sm font-medium text-gray-700 mb-2"
            >검색할 태그</label
          >
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              id="searchTag"
              v-model="searchTag"
              type="text"
              placeholder="검색할 태그를 입력하세요"
              class="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md focus:outline-none focus:ring-black focus:border-black sm:text-sm border border-gray-300 text-gray-900"
            />
            <button
              @click="searchPortfolios"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              검색
            </button>
          </div>
        </div>

        <div v-if="filteredPortfolios.length > 0" class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900">검색 결과</h3>
          <ul class="space-y-4">
            <li
              v-for="portfolio in filteredPortfolios"
              :key="portfolio.id"
              class="bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <h4 class="text-lg font-medium text-gray-900 mb-2">
                {{ portfolio.title }}
              </h4>
              <p class="text-gray-600 mb-2">{{ portfolio.content }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in portfolio.tags"
                  :key="index"
                  :style="{
                    backgroundColor: pastelColors[index % pastelColors.length],
                    color: getContrastColor(
                      pastelColors[index % pastelColors.length]
                    )
                  }"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium"
                >
                  {{ tag }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="searchPerformed" class="text-center text-gray-600 mt-6">
          <p>해당 태그로 작성된 포트폴리오가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const searchTag = ref('')
const portfolios = reactive([
  {
    id: 1,
    title: '포트폴리오 1',
    content:
      '이것은 첫 번째 포트폴리오의 내용입니다. JavaScript와 Vue.js를 사용한 프로젝트에 대한 설명이 포함되어 있습니다.',
    tags: ['JavaScript', 'Vue']
  },
  {
    id: 2,
    title: '포트폴리오 2',
    content:
      '두 번째 포트폴리오는 HTML과 CSS를 사용한 반응형 웹 디자인 프로젝트에 관한 것입니다.',
    tags: ['HTML', 'CSS']
  },
  {
    id: 3,
    title: '포트폴리오 3',
    content:
      '세 번째 포트폴리오는 Node.js와 Express를 사용한 백엔드 프로젝트를 소개합니다.',
    tags: ['Node.js', 'Express', 'JavaScript']
  }
])
const filteredPortfolios = ref([])
const searchPerformed = ref(false)

const pastelColors = [
  '#FFB3BA',
  '#FFDFBA',
  '#FFFFBA',
  '#BAFFC9',
  '#BAE1FF',
  '#FFC6FF',
  '#FFADAD',
  '#FFC6A5',
  '#FDFFB6',
  '#CAFFBF'
]

const searchPortfolios = () => {
  searchPerformed.value = true
  if (searchTag.value) {
    filteredPortfolios.value = portfolios.filter((portfolio) =>
      portfolio.tags.some((tag) =>
        tag.toLowerCase().includes(searchTag.value.toLowerCase())
      )
    )
  } else {
    filteredPortfolios.value = []
  }
}

const getContrastColor = (hexcolor) => {
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}

.font-sans {
  font-family: 'Noto Sans KR', sans-serif;
}

input,
textarea,
button {
  font-family: 'Noto Sans KR', sans-serif;
}

h2,
h3,
h4 {
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.025em;
}
</style>
