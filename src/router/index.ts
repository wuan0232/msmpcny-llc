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
      path: '/procedures',
      name: 'procedures',
      component: () => import('../views/service/ProceduresView.vue'),
    },
    {
      path: '/prolozone',
      name: 'prolozone',
      component: () => import('../views/service/ProloZoneView.vue'),
    },
    {
      path: '/platelet-rich-plasma',
      name: 'platelet-rich-plasma',
      component: () => import('../views/service/PrpSection.vue'),
    },
    {
      path: '/sacroiliac-stabilization',
      name: 'sacroiliac-stabilization',
      component: () => import('../views/service/SIStabilizationSection.vue'),
    },
    {
      path: '/perineural-injections',
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
  ],
})

export default router
