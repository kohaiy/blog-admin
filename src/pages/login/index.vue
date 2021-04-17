<template>
  <div class="login">
    <div class="login-box">
      <div class="header"><h1>后台登录</h1></div>
      <div class="body">
        <el-form :model="form" ref="formEl">
          <el-form-item prop="loginName">
            <el-input v-model="form.loginName" placeholder="用户名/邮箱地址" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button @click="handleLogin" type="primary">马上登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElForm, ElMessage } from 'element-plus';
import { postAuthLogin } from '@/apis/modules/auth';
import { PostAuthLoginBody } from '@/apis/modules/auth/post-auth-login';

export default defineComponent({
  setup() {
    const formEl = ref<typeof ElForm | null>(null);
    const form = ref<PostAuthLoginBody>({
      loginName: '',
      password: '',
    });

    const router = useRouter();

    const handleLogin = () => {
      if (formEl.value) {
        formEl.value.validate(async (valid: boolean) => {
          if (valid) {
            const { data } = await postAuthLogin(form.value);
            if (data) {
              ElMessage.success('登录成功');
              localStorage.setItem('token', data.token);
              router.replace({
                name: 'Home',
              });
            }
          }
        });
      }
    };
    return {
      form,
      formEl,
      handleLogin,
    };
  },
});
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #282c34;
  .login-box {
    width: 100%;
    max-width: 360px;
    padding: 40px 30px 60px;
    border-radius: 19px;
    background-color: #fff;
    .header {
      text-align: center;
      font-size: 16px;
    }
    .body {
      margin-top: 20px;
    }
    .footer {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
