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

    authenticated: [],

    isloading: false,
    // 博主信息
    adminInfo: {},
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
  //
  SET_USER_AUTH (state, action) {
    if(state.authenticated.length === 4) {
      state.authenticated.shift();
    }
    state.authenticated = [...state.authenticated, action];
    console.log(state.authenticated);
  },
  // 设置UA
  SET_LOADING (state, action = false) {
    state.isloading = action
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
