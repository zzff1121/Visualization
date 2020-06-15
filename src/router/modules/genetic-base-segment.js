import Layout from '@/layout'

export default {
  path: '/genetic/base/segment',
  component: Layout,
  name: 'GeneticBaseSegment',
  redirect: '/genetic/base/segment/index',
  meta: {
    title: '分词',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/layout/developing'),
      name: 'GeneticBaseSegmentIndex',
      meta: { title: '分词', icon: 'fa-codepen' }
    }
  ]
}
