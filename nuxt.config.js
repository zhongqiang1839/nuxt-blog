const pkg = require('./package');
const webpack = require('webpack');

module.exports = {
  mode: 'universal',
  cache: {
    max: 1000,
    maxAge: 900000
  },
  vendor: [
    'axios',
    'howler',
    'marked',
    'gravatar',
    'highlight.js'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: "小强哥",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0' },
      { name: 'renderer', content: 'webkit' },
      { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'theme-color', content: '#607d8b' },
      { name: 'apple-mobile-web-app-title', content: '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'author', content: '小强哥' },
      { hid: 'keywords', name: 'keywords', content: 'vue, nodejs, react,前端，FE, 全栈开发' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#EA6F5A' },

  dev: (process.env.NODE_ENV !== 'production'),

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  /*
  ** Global CSS
  *
  */
  css: [
    { src: '~/assets/less/common.less', lang: 'less' },
    'viewerjs/dist/viewer.css',
    'swiper/dist/css/swiper.css',
    'mavon-editor/dist/css/index.css',
    'highlight.js/styles/github.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/marked.js', ssr: false },
    { src: '~/plugins/highlight.js', ssr: false},
    { src: '~/plugins/particle.js', ssr: false  },
    { src: "~/plugins/vue-markdown.js", ssr: false },
    { src: "~/plugins/tab-active.js", ssr: false },
    { src: "~/plugins/vue-map.js", ssr: false },
    { src: "~/plugins/viewer.js", ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/router.js', ssr: false },
    { src: '~/plugins/count-to', ssr: false },
    { src: '~/plugins/live2d/live2d.js', ssr: false },
    { src: '~/plugins/live2d/waifu-tips.js', ssr: false },
    { src: '~/plugins/love.js', ssr: false },
    { src: '~/plugins/copy.js', ssr: false },
    { src: '~/utils/meta-parse.js', ssr: false },
    { src: '~/plugins/gravatar.js', ssr: false },
    { src: '~/plugins/filter.js', ssr: false },
  ],

  // router
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
      'howler',
      'marked',
      'gravatar',
      'highlight.js'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
};
