import Layout from '@/layout'

export default {
  path: '/medic/annotator',
  component: Layout,
  name: 'MedicAnnotator',
  redirect: '/medic/annotator/pos',
  meta: {
    title: '词汇层级标注',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'pos',
      component: () => import('@/layout/developing'),
      name: 'MedicAnnotatorPos',
      meta: { title: '分词与词性', icon: 'fa-codepen' }
    },
    {
      path: 'new-word',
      component: () => import('@/layout/developing'),
      name: 'MedicAnnotatorNewWord',
      meta: { title: '领域新词与未登录词', icon: 'fa-codepen' }
    },
    {
      path: 'terminology',
      component: () => import('@/layout/developing'),
      name: 'MedicAnnotatorTerminology',
      meta: { title: '领域术语识别', icon: 'fa-codepen' }
    }
  ]
}
