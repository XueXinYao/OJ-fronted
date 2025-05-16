import store from "@/store";
import router from "@/router";
import ACCESS_Enum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // console.log(store.state.user.loginUser);
  if (to.meta.access === "canAdmin") {
    if (store.state.user.loginUser?.userRole != ACCESS_Enum.Admin) {
      next("/noAuth");
    }
  }
  const loginUser = store.state.user.loginUser;

  // 如果之前没有登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    //加await  是为了等用户登录成功之后，在执行后续代码
    await store.dispatch("user/getLoginUser");
  }
  const needAccess = to.meta.access ?? ACCESS_Enum.NotLogin;
  //需要跳转的页面需要登录
  if (needAccess !== ACCESS_Enum.NotLogin) {
    //如果没登陆,去登录
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess as string)) {
      next(`/noAuth`);
      return;
    }
  }
  next();
});
