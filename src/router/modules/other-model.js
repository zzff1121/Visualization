import Layout from '@/layout'

export default {
  path: '/other/model',
  component: Layout,
  name: 'OtherModel',
  redirect: '/other/model/upload',
  meta: {
    title: '模型',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'upload',
      component: () => import('@/layout/developing'),
      name: 'OtherModelUpload',
      meta: { title: '上传', icon: 'fa-codepen' }
    },
    {
      path: 'download',
      component: () => import('@/layout/developing'),
      name: 'OtherModelDownload',
      meta: { title: '下载', icon: 'fa-codepen' }
    }
  ]
}
