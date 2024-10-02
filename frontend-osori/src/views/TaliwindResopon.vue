<!-- Tailwind 로 반응형 테스트 및 연습 -->

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-center mb-12 text-gray-900">
        미니멀 카드 갤러리
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              {{ card.title }}
            </h2>
            <p class="text-gray-600 text-sm mb-4">{{ card.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ card.date }}</span>
              <button
                class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
              >
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    id: 1,
    title: '아름다운 풍경',
    description:
      '자연의 경이로움을 담은 풍경 사진입니다. 산과 호수가 어우러진 모습이 인상적입니다.',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 15일'
  },
  {
    id: 2,
    title: '도시의 야경',
    description:
      '밤에 빛나는 도시의 모습입니다. 고층 빌딩들의 불빛이 아름답게 펼쳐져 있습니다.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 14일'
  },
  {
    id: 3,
    title: '해변의 일몰',
    description:
      '황금빛 물결이 펼쳐진 해변의 일몰 장면입니다. 평화로운 분위기가 느껴집니다.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 13일'
  },
  {
    id: 4,
    title: '숲속의 오솔길',
    description:
      '울창한 숲속을 가로지르는 오솔길입니다. 신선한 공기와 자연의 소리를 상상해보세요.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 12일'
  },
  {
    id: 5,
    title: '도심 속 공원',
    description:
      '번잡한 도시 한가운데 있는 평화로운 공원의 모습입니다. 도시인들의 휴식처입니다.',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 11일'
  },
  {
    id: 6,
    title: '산정상의 뷰',
    description:
      '높은 산 정상에서 바라본 장관입니다. 구름 위로 펼쳐진 풍경이 압도적입니다.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2024년 3월 10일'
  }
])
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

body,
h1,
h2,
p,
span,
button {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
