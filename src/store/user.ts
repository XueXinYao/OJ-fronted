// initial state
import { StoreOptions } from "vuex";
import ACCESS_Enum from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
// actions     执行异步操作，触发mutation的方法

// mutations   更新变量的方法

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_Enum.NotLogin,
    },
  }),

  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();

      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_Enum.NotLogin,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser.userName = payload.userAccount ?? "未登录";
      // console.log(payload.userRole);
      state.loginUser.userRole = payload.userRole ?? ACCESS_Enum.NotLogin;
    },
  },
} as StoreOptions<any>;
