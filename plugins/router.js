import config from '~/utils/config'
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    store.commit('options/SET_LOADING', true);
    setTimeout(() => {
      store.commit('options/SET_LOADING', false)
    }, 2000)
    next()
  })

  app.router.afterEach((to, from) => {
    if (to.fullPath === '/write' && store.state.options.authenticated.join("") !== config.simpleWord) {
      app.router.go(-1)
    }
  })
}
