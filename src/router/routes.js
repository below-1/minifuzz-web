
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Landing.vue') }
    ]
  },

  { path: '/auth', component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/Login.vue') }
    ]},

  { path: '/app', component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/app/Home.vue') },
      { path: 'rules', component: () => import('pages/rule/List.vue') },
      { path: 'rules/:id/update', component: () => import('pages/rule/Update.vue'), props: true },
      { path: 'rules/create', component: () => import('pages/rule/Create.vue') },
      { path: 'quiz', component: () => import('pages/quiz/QuizContainer.vue') }
    ]},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
