import Layout from '@/layout'

export default {
  path: '/genetic/process/cluster',
  component: Layout,
  name: 'GeneticProcessCluster',
  redirect: '/genetic/process/cluster/index',
  meta: {
    title: '文本聚类',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/layout/developing'),
      name: 'GeneticProcessClusterIndex',
      meta: { title: '文本聚类', icon: 'fa-codepen' }
    }
  ]
}
