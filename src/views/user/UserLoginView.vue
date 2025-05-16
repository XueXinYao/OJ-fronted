<template>
  <div id="userLoginView">
    <h2>用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" tooltip="请输入账号" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="post" label="密码" tooltip="密码不少于八位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-space size="large">
          <a-button type="primary" html-type="submit" style="width: 120px"
            >登录</a-button
          >
          <a-button type="primary" @click="goToRegister" style="width: 120px"
            >注册</a-button
          >
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import store from "@/store";
const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    // alert("登陆成功" + JSON.stringify(res.data));
    router.push({ path: "/", replace: false });
    await store.dispatch("user/getLoginUser");
  } else {
    message.error("登陆失败" + res.message);
  }
};
// 跳转到注册页面
const goToRegister = () => {
  router.push({ path: "/user/register" });
};
</script>
