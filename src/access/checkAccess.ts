import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NotLogin) => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NotLogin;
  if (needAccess === ACCESS_ENUM.NotLogin) {
    return true;
  }
  // 如果用户登录才能访问
  if (needAccess === ACCESS_ENUM.User) {
    // 如果用户没登录，那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NotLogin) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.Admin) {
    // 如果不为管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.Admin) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
