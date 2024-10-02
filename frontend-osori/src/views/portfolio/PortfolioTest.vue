<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-3xl mx-auto space-y-12 bg-white p-8 sm:p-12 rounded-2xl shadow-sm"
    >
      <!-- 포트폴리오 작성 섹션 -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-8">포트폴리오 작성</h2>
        <div class="space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-1"
              >제목</label
            >
            <input
              v-model="title"
              id="title"
              type="text"
              placeholder="제목을 입력하세요"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <div>
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 mb-1"
              >내용</label
            >
            <textarea
              v-model="content"
              id="content"
              rows="4"
              placeholder="내용을 입력하세요"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label
              for="newTag"
              class="block text-sm font-medium text-gray-700 mb-1"
              >태그</label
            >
            <div class="flex rounded-md shadow-sm">
              <input
                v-model="newTag"
                id="newTag"
                type="text"
                @keyup.enter="addTag"
                placeholder="태그 입력 후 Enter"
                class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
              />
              <button
                @click="addTag"
                class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 sm:text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
              >
                추가
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            >
              {{ tag }}
              <button
                @click="removeTag(index)"
                class="ml-1 inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">태그 삭제</span>
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <button
          @click="savePortfolio"
          class="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
        >
          포트폴리오 저장
        </button>
      </div>

      <!-- 태그로 검색 섹션 -->
      <div class="pt-12 border-t border-gray-200">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">태그로 검색</h2>
        <div class="flex rounded-md shadow-sm">
          <input
            v-model="searchTag"
            type="text"
            placeholder="검색할 태그를 입력하세요"
            class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
          />
          <button
            @click="searchPortfolios"
            class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 sm:text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
          >
            검색
          </button>
        </div>

        <div v-if="filteredPortfolios.length > 0" class="mt-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">검색 결과</h3>
          <ul class="space-y-4">
            <li
              v-for="portfolio in filteredPortfolios"
              :key="portfolio.id"
              class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h4 class="text-lg font-medium text-gray-900 mb-2">
                {{ portfolio.title }}
              </h4>
              <p class="text-sm text-gray-600 mb-4">{{ portfolio.content }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in portfolio.tags"
                  :key="tag"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {{ tag }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div
          v-else-if="searchTag"
          class="mt-8 text-center text-sm text-gray-500"
        >
          해당 태그로 작성된 포트폴리오가 없습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const title = ref('')
    const content = ref('')
    const newTag = ref('')
    const tags = ref([])
    const portfolios = ref([])
    const searchTag = ref('')
    const filteredPortfolios = ref([])

    const addTag = () => {
      if (newTag.value && !tags.value.includes(newTag.value)) {
        tags.value.push(newTag.value)
        newTag.value = ''
      }
    }

    const removeTag = (index) => {
      tags.value.splice(index, 1)
    }

    const savePortfolio = () => {
      if (title.value && content.value) {
        const newPortfolio = {
          id: Date.now(),
          title: title.value,
          content: content.value,
          tags: [...tags.value]
        }
        portfolios.value.push(newPortfolio)
        localStorage.setItem('portfolios', JSON.stringify(portfolios.value))
        console.log('포트폴리오 저장됨:', newPortfolio)

        title.value = ''
        content.value = ''
        tags.value = []
      } else {
        alert('제목과 내용을 입력하세요.')
      }
    }

    const searchPortfolios = () => {
      if (searchTag.value) {
        filteredPortfolios.value = portfolios.value.filter((portfolio) =>
          portfolio.tags.includes(searchTag.value)
        )
      } else {
        filteredPortfolios.value = []
      }
    }

    onMounted(() => {
      const storedPortfolios =
        JSON.parse(localStorage.getItem('portfolios')) || []
      portfolios.value = storedPortfolios
    })

    return {
      title,
      content,
      newTag,
      tags,
      portfolios,
      searchTag,
      filteredPortfolios,
      addTag,
      removeTag,
      savePortfolio,
      searchPortfolios
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

<!-- <template>
  <div>
    <h2>포트폴리오 작성</h2>
    <input v-model="title" placeholder="제목을 입력하세요" />
    <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>
    <input v-model="newTag" @keyup.enter="addTag" placeholder="태그 입력" />
    <ul>
      <li v-for="(tag, index) in tags" :key="index">
        {{ tag }} <button @click="removeTag(index)">삭제</button>
      </li>
    </ul>
    <button @click="savePortfolio">포트폴리오 저장</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      newTag: '',
      tags: []
    };
  },
  methods: {
    addTag() {
      if (this.newTag && !this.tags.includes(this.newTag)) {
        this.tags.push(this.newTag);
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    savePortfolio() {
      const portfolio = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        tags: this.tags
      };
      // 로컬 스토리지나 서버에 포트폴리오를 저장하는 로직
      console.log("포트폴리오 저장됨:", portfolio);
      // 이후 로직은 서버에 전송하거나 Vuex로 관리 가능
    }
  }
};
</script> -->
