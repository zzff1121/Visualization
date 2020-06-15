import Layout from '@/layout'

export default {
  path: '/test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Test',
  alwaysShow: true,
  meta: {
    title: '测试',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'test-page',
      component: () => import('@/views/modules/test/index'),
      name: 'TestPage',
      meta: { title: '测试页', icon: 'fa-bug' }
    },
    {
      path: 'example-page',
      component: () => import('@/views/modules/test/example'),
      name: 'ExamplePage',
      meta: { title: '示例页面', icon: 'fa-bug' }
    },
    {
      path: 'form-page',
      component: () => import('@/views/modules/test/form'),
      name: 'FormPage',
      meta: { title: '表单设计器', icon: 'fa-wpforms', autoStyle: true }
    }
  ]
}
