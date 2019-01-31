const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
  mode: 'universal',
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
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#24292e' },

  dev: (process.env.NODE_ENV !== 'production'),

  /*
  ** Global CSS
  *
  */
  css: [
    { src: '~/assets/less/common.less', lang: 'less' },
    'highlight.js/styles/github.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/marked.js', ssr: false },
    { src: '~/plugins/highlight.js', ssr: false},
    { src: '~/plugins/particle.js', ssr: false  },
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
            '$': 'jquery'
        })
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
