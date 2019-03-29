/**
 * 系统配置
 * @returns {{mobileLayout: boolean, adminInfo: {}, userAgent: string, option: {}}}
 */
export const state = () => {
  return {
    // ua
    userAgent: '',
    // 是否为移动端
    mobileLayout: false,

    showSidebar: false,

    // 博主信息
    adminInfo: {},
    // 网站信息
    option: {},
  }
};

export const mutations = {
  SET_ADMIN_INFO (state, action) {
    state.adminInfo = action
  },
  // 设置是否移动端状态
  SET_MOBILE_LAYOUT (state, action) {
    state.mobileLayout = action
  },
  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },
  // 设置sidebar 是否显示
  SET_SIDE_BAR(state, action = true) {
    if(action === false) {
      state.showSidebar = false;
      return;
    }
    state.showSidebar = !state.showSidebar
  }
};
