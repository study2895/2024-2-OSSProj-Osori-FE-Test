<!-- src/layouts/AuthLayout.vue -->
<template>
  <div>
    <header>인증 관련 페이지 공통 레이아웃 헤더</header>
    <router-view />
    <!-- 자식 컴포넌트들이 렌더링되는 영역 -->
    <footer>공통 레이아웃 푸터</footer>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
