import Layout from '@/layout'

export default {
  path: '/genetic/base/pos',
  component: Layout,
  name: 'GeneticBasePos',
  redirect: '/genetic/base/pos/index',
  meta: {
    title: '词性标注',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/layout/developing'),
      name: 'GeneticBasePosIndex',
      meta: { title: '词性标注', icon: 'fa-codepen' }
    }
  ]
}
