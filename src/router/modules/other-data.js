import Layout from '@/layout'

export default {
  path: '/other/data',
  component: Layout,
  name: 'OtherData',
  redirect: '/other/data/upload',
  meta: {
    title: '数据集',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'upload',
      component: () => import('@/layout/developing'),
      name: 'OtherDataUpload',
      meta: { title: '上传', icon: 'fa-codepen' }
    },
    {
      path: 'download',
      component: () => import('@/layout/developing'),
      name: 'OtherDataDownload',
      meta: { title: '下载', icon: 'fa-codepen' }
    }
  ]
}
