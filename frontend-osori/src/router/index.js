/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Profile from '@/views/Profile.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue' // 중첩 라우팅의 부모 레이아웃
import VerifyEmail from '@/views/login/VerifyEmail.vue'
import SignIn from '@/views/login/SignIn.vue'
import SignUpForm from '@/views/login/SignUpForm.vue'
import PortfolioCreate from '@/views/portfolio/PortfolioCreate.vue'
import PortfolioByTag from '@/views/portfolio/PortfolioByTag.vue'
import PortfolioTest from '@/views/portfolio/PortfolioTest.vue'
import PortfolioLayout from '@/components/layout/PortfolioLayout.vue' // 중첩 라우팅의 부모 레이아웃
import TaliwindResopon from '@/views/TaliwindResopon.vue'
//import NotFoundPage from '@/views/NotFoundPage.vue' // 404 페이지

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/auth',
    component: AuthLayout, // 부모 레이아웃
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: SignIn
      },
      {
        path: 'signupform',
        name: 'signupform',
        component: SignUpForm
      },
      {
        path: 'verifyemail',
        name: 'verifyemail',
        component: VerifyEmail
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true } // 인증이 필요한 페이지
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/auth/signin' // 잘못된 경로는 로그인 페이지로 리다이렉트
  },
  {
    path: '/portfolios', // 부모 라우트
    component: PortfolioLayout, // 공통 레이아웃 컴포넌트
    children: [
      {
        path: 'new', // /portfolios/new
        name: 'CreatePortfolio',
        component: PortfolioCreate
      },
      {
        path: 'tag', // /portfolios/tag
        name: 'SearchByTag',
        component: PortfolioByTag
      },
      {
        path: 'test', // /portfolios/tag
        name: 'Test',
        component: PortfolioTest
      }
    ]
  },
  {
    path: '/responsivetest',
    name: 'TaliwindResopon',
    component: TaliwindResopon
  }
  //{ path: '*', component: NotFoundPage } // 404 페이지 처리 (활성화 필요시)
]

const router = createRouter({
  history: createWebHashHistory('/akoming/'), // Hash 모드를 사용
  routes
})

// 라우트 가드
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 인증이 필요한 페이지를 확인
    if (!isAuthenticated()) {
      next({ name: 'signin' }) // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    } else {
      next() // 인증된 경우 계속 진행
    }
  } else {
    next() // 인증이 필요 없는 페이지는 그대로 진행
  }
})

function isAuthenticated() {
  // 로컬 스토리지에서 'user' 항목으로 로그인 여부를 확인하는 함수
  return !!localStorage.getItem('user') // 'user' 정보가 있으면 true 반환
}

export default router
