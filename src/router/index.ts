import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/patient-forms',
      name: 'patient-forms',
      component: () => import('../views/PatientFormsView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/service/procedures',
      name: 'procedures',
      component: () => import('../views/service/ProceduresView.vue'),
    },
    {
      path: '/service/prolozone',
      name: 'prolozone',
      component: () => import('../views/service/ProloZoneView.vue'),
    },
    {
      path: '/service/prp',
      name: 'prp',
      component: () => import('../views/service/PrpSection.vue'),
    },
    {
      path: '/service/sacroiliac-stabilization',
      name: 'sacroiliac-stabilization',
      component: () => import('../views/service/SIStabilizationSection.vue'),
    },
    {
      path: '/service/perineural-injections',
      name: 'perineural-injections',
      component: () => import('../views/service/PerineuralInjectionSection.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/ContactSection.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/AboutView.vue'),
    },
    {
      path: '/service/prolotherapy',
      name: 'prolotherapy',
      component: () => import('../views/ProlotherapyView.vue'),
    },
  ],
})

export default router
