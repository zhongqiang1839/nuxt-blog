/**
 *
 * option
 */
export const state = () => {
  return {
    adminInfo: '',
  }
}

export const mutations = {
  SET_ADMIN_INFO (state, action) {
    state.adminInfo = action
  },
}
