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
          포트폴리오 작성
        </h2>

        <form @submit.prevent="savePortfolio" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700"
              >제목</label
            >
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="제목을 입력하세요"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-900"
            />
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700"
              >내용</label
            >
            <textarea
              id="content"
              v-model="content"
              placeholder="내용을 입력하세요"
              rows="4"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black text-gray-900"
            ></textarea>
          </div>

          <div>
            <label for="newTag" class="block text-sm font-medium text-gray-700"
              >태그</label
            >
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                id="newTag"
                v-model="newTag"
                @keyup.enter="addTag"
                type="text"
                placeholder="태그를 입력 후 엔터를 눌러 추가하세요"
                class="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md focus:outline-none focus:ring-black focus:border-black sm:text-sm border border-gray-300 text-gray-900"
              />
              <button
                type="button"
                @click="addTag"
                class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                추가
              </button>
            </div>
          </div>

          <div v-if="tags.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in tags"
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
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span class="sr-only">태그 제거</span>
                <svg
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          </div>

          <div class="flex items-center justify-end">
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const title = ref('')
const content = ref('')
const newTag = ref('')
const tags = reactive([])

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

const addTag = () => {
  if (newTag.value && !tags.includes(newTag.value)) {
    tags.push(newTag.value)
    newTag.value = ''
  }
}

const removeTag = (index) => {
  tags.splice(index, 1)
}

const savePortfolio = () => {
  if (title.value && content.value) {
    const newPortfolio = {
      id: Date.now(),
      title: title.value,
      content: content.value,
      tags: [...tags]
    }
    console.log('포트폴리오 저장:', newPortfolio)
    title.value = ''
    content.value = ''
    tags.splice(0, tags.length)
  } else {
    alert('제목과 내용을 입력하세요.')
  }
}

const getContrastColor = (hexcolor) => {
  // Convert hex to RGB
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)

  // Calculate luminance
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  // Return black or white depending on luminance
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

h2 {
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.025em;
}
</style>
