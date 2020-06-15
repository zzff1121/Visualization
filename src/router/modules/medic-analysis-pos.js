import Layout from '@/layout'

export default {
  path: '/medic/analysis/pos',
  component: Layout,
  name: 'MedicAnalysis',
  redirect: '/medic/analysis/pos/index',
  meta: {
    title: '分词与词性分析',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/layout/developing'),
      name: 'MedicAnalysisPosIndex',
      meta: { title: '分词与词性分析', icon: 'fa-codepen' }
    }
  ]
}
