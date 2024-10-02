<!-- src/components/ErrorMessage.vue -->
<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <p v-if="errorMessage" class="mt-2 text-sm text-red-600 font-medium">
      {{ errorMessage }}
    </p>
  </transition>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
/* 컴포넌트 스타일을 여기서 정의할 수 있습니다 */
</style>
