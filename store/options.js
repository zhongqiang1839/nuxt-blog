/**
 *
 * option
 */
export const state = () => {
  return {
    // ua
    userAgent: '',

    // 是否为移动端
    mobileLayout: false,

    // 博主信息
    adminInfo: {},

    // 网站信息
    option: {},
  }
}

export const mutations = {
  SET_ADMIN_INFO (state, action) {
    state.adminInfo = action
  },
}
