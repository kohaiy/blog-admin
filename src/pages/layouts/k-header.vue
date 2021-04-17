<template>
  <div class="k-header">
    <div class="k-header--left">
      <div
        class="btn-side-toggle"
        :class="{ 'is-closed': isSideClosed }"
        @click="toggleSideStatus"
      >
        <i class="fa fa-bars"></i>
      </div>
    </div>
    <div class="k-header--right">
      <div class="head-img">
        <i class="fa fa-user"></i>
      </div>
      <el-dropdown @command="handleDropdownClick">
        <div class="nickname">
          {{ userInfo.name }}
          <i class="fa fa-caret-down"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getUserInfo } from '@/apis/modules/user';
import { GetUserInfoResp } from '@/apis/modules/user/get-user-info';

export default defineComponent({
  setup() {
    const store = useStore();
    const isSideClosed = computed(() => store.state.isSideClosed);

    const userInfo = ref<GetUserInfoResp>({
      id: 0,
      name: '',
      email: '',
    });

    const loadUserInfo = async () => {
      const { data } = await getUserInfo();
      if (data) {
        userInfo.value = data;
      }
    };
    loadUserInfo();

    const router = useRouter();
    const handleDropdownClick = (command: string) => {
      if (command === 'logout') {
        localStorage.removeItem('token');
        router.replace({
          name: 'Login',
        });
      }
    };

    return {
      isSideClosed,
      userInfo,
      handleDropdownClick,
      toggleSideStatus: () => store.commit('toggleSideStatus'),
    };
  },
});
</script>
