import Layout from '@/layout'

export default {
  path: '/medic/analysis/ner',
  component: Layout,
  name: 'MedicAnalysisNer',
  redirect: '/medic/analysis/ner/entity',
  meta: {
    title: '命名实体',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'entity',
      component: () => import('@/layout/developing'),
      name: 'MedicAnalysisNerEntity',
      meta: { title: '医疗命名实体识别', icon: 'fa-codepen' }
    },
    {
      path: 'property',
      component: () => import('@/layout/developing'),
      name: 'MedicAnalysisNerProperty',
      meta: { title: '医疗实体属性识别', icon: 'fa-codepen' }
    },
    {
      path: 'relation',
      component: () => import('@/layout/developing'),
      name: 'MedicAnalysisNerRelation',
      meta: { title: '医疗实体关系识别', icon: 'fa-codepen' }
    }
  ]
}
