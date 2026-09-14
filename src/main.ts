import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setSiteSeo } from './utils/siteSeo'

const routeSeo: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Musculoskeletal Medicine, P.C. | MSMP CNY',
    description: 'Musculoskeletal medicine, pain management, regenerative medicine, and patient resources in New York.',
  },
  about: {
    title: 'About Our Physicians',
    description: 'Learn about the physicians and clinical experience at Musculoskeletal Medicine, P.C.',
  },
  services: {
    title: 'Musculoskeletal Medicine Services',
    description: 'Explore non-surgical pain management and regenerative medicine services from Musculoskeletal Medicine, P.C.',
  },
  procedures: {
    title: 'Procedures',
    description: 'Review procedures offered by Musculoskeletal Medicine, P.C.',
  },
  prolotherapy: {
    title: 'Prolotherapy',
    description: 'Learn about prolotherapy and whether this regenerative treatment may be appropriate for you.',
  },
  prolozone: {
    title: 'Prolozone Therapy',
    description: 'Patient information about Prolozone injection therapy.',
  },
  prp: {
    title: 'Platelet-Rich Plasma Treatment',
    description: 'Patient information about platelet-rich plasma treatment at Musculoskeletal Medicine, P.C.',
  },
  'sacroiliac-stabilization': {
    title: 'Sacroiliac Joint Stabilization',
    description: 'Patient information about sacroiliac joint stabilization and stabilization procedures.',
  },
  'perineural-injections': {
    title: 'Perineural Injections',
    description: 'Patient information about perineural and trigger point injections.',
  },
  'patient-forms': {
    title: 'Patient Forms',
    description: 'Download patient information, history, consent, and pain diagram forms.',
  },
  contact: {
    title: 'Contact Us',
    description: 'Contact Musculoskeletal Medicine, P.C. and find office location information.',
  },
}

router.afterEach((to) => {
  if (to.name === 'blog' || to.name === 'blog-detail') return
  const seo = routeSeo[String(to.name)] || {
    title: 'Musculoskeletal Medicine, P.C. | MSMP CNY',
    description: 'Musculoskeletal medicine, pain management, regenerative medicine, and patient resources in New York.',
  }
  setSiteSeo({ ...seo, path: to.path })
})

const app = createApp(App)

app.use(router)

app.mount('#app')
