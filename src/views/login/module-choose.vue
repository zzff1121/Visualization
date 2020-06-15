<template>
  <el-container class="module-choose">
    <el-main>
      <div class="modules">
        <h2>请进行功能选择</h2>
        <div
          v-for="(m,i) of modules"
          :key="i"
          class="module"
        >
          <div
            class="name"
            @click="onItemClick(m.items[0],m)"
          >
            <svg-icon
              class="icon"
              :icon-class="m.icon"
            />
            <div class="title">{{ m.title }}</div>
          </div>
          <div class="items">
            <div
              v-for="(item,j) of m.items"
              :key="j"
              class="item"
              @click="onItemClick(item,m)"
            >
              <svg-icon :icon-class="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { asyncRoutes } from '@/router'
import { mapActions } from 'vuex'

import _ from 'lodash'
export default {
  data() {
    return {
      modules: [
        {
          name: 'genetic',
          icon: 'product3',
          title: '通用自然语言处理',
          items: []
        },
        {
          name: 'medic',
          icon: 'product2',
          title: '医疗文本处理',
          items: []
        },
        {
          name: 'other',
          icon: 'product4',
          title: '其他工具',
          items: []
        }
      ]
    }
  },
  mounted() {
    // 根据路由生成页面
    console.log(asyncRoutes)
    // 根据顶级路由前缀（系统不存在顶级路由，顶级路由不会显示在任何菜单中）分组路由
    const groupBy = _.groupBy(asyncRoutes, r => {
      return (r.path + '/').split('/')[1]
    })

    // 设置模块下一级路由列表
    this.modules.forEach(m => {
      if (groupBy[m.name]) {
        m.items = groupBy[m.name]
      }
    })
  },
  methods: {
    ...mapActions({ changeCurrentModule: 'user/changeCurrentModule' }),
    async onItemClick(item, module) {
      await this.changeCurrentModule(module.name)
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.module-choose {
  height: 100%;
  .modules {
    width: 1200px;
    margin: 0 auto;
    .module {
      display: flex;
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-bottom: 1px solid $--border-color-lighter;
      .border {
        border: 1px solid $--border-color-lighter;
        cursor: pointer;
        &:hover {
          box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
            0px 8px 64px 0px rgba(10, 14, 29, 0.08);
          border-color: $--border-color-light;
        }
      }
      .name {
        width: 285px;
        padding: 12px 24px;
        background-color: #fff;
        @extend .border;
        text-align: center;
        $icon-size: 150px;
        .icon {
          font-size: $icon-size;
          fill: red;
        }
        .title {
          font-size: 16px;
          color: $--color-text-primary;
          margin: 4px 0;
        }
      }
      .items {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 0 24px;
        .item {
          @extend .border;
          width: calc(25% - 20px);
          margin-right: 20px;
          padding: 14px 24px;
          background-color: #fff;
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style>
