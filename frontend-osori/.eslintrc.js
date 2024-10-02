module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
    //"plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'on' // 사용하지 않는 변수 경고 해제
  }
}
