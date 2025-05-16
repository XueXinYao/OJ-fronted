<template>
  <a-row
    id="globalHeader"
    class="grid-demo"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div
            :style="{
              width: '80px',
              height: '30px',
              borderRadius: '2px',
              background: 'rgba(255,255,255)',
              cursor: 'text',
            }"
          />
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" />
            <div>X O J</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_Enum from "@/access/accessEnum";
const router = useRouter();
const store = useStore();

const loginUser = store.state.user.loginUser;
//控制展示的菜单，不用v-for导致浪费性能
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//默认是主页
const selectedKeys = ref(["/"]);

//路由跳转后，更新选择的菜单项，跳转后所以使用的是beforeEach
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "xxy",
//     userRole: ACCESS_Enum.Admin,
//   });
// }, 1000);

// let currentUser = store.state.user?.loginUser?.userName ?? "未登录";
</script>

<style scoped>
.logo {
  height: 48px;
}
</style>
