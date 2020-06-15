import Layout from '@/layout'

export default {
  path: '/genetic/process/classify',
  component: Layout,
  name: 'GeneticProcessClassify',
  redirect: '/genetic/process/classify/domian',
  meta: {
    title: '文本分类',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'domian',
      component: () => import('@/layout/developing'),
      name: 'GeneticProcessClassifyDomain',
      meta: { title: '领域分类', icon: 'fa-codepen' }
    },
    {
      path: 'theme',
      component: () => import('@/layout/developing'),
      name: 'GeneticProcessClassifyTheme',
      meta: { title: '主题分类', icon: 'fa-codepen' }
    }
  ]
}
