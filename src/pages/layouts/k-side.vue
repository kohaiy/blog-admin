<template>
  <div class="k-side" :class="{ 'is-closed': isSideClosed }">
    <div class="k-side--header">
      <div class="icon"><i class="fa fa-bandcamp"></i></div>
      <div class="title" v-show="!isSideClosed">柯灰's Blog 后台</div>
    </div>
    <div class="k-side--body">
      <el-menu
        :uniqueOpened="true"
        :collapse="isSideClosed"
        router
        default-active="2"
        background-color="#282c34"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/category">
          <i class="el-icon-location"></i>
          <template #title>分类管理</template>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-menu"></i>
          <template #title>文章管理</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const isSideClosed = computed(() => store.state.isSideClosed);
    return {
      isSideClosed,
    };
  },
});
</script>
