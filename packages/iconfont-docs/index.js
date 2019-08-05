const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
const path = require('path')

const request = require('request')
const requestPromise = _url => {
  return new Promise((resolve, reject) => {
    request(_url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        throw new Error('request error')
      }
    })
  })
}

module.exports = (opts, ctx) => {
  const defaultOpts = {
    fontClass: 'icon-',
    fontFamily: 'iconfont',
    key: ''
  }
  opts = Object.assign(defaultOpts, opts)

  ctx.siteConfig.head = (ctx.siteConfig.head || []).concat([
    ['link', { rel: 'stylesheet', href: `https://at.alicdn.com/t/${opts.key}.css` }],
    ['script', { src: `https://at.alicdn.com/t/${opts.key}.js` }]
  ])

  return {
    name: 'iconfont-docs',

    enhanceAppFiles() {
      return {
        name: 'dynamic-icon-demo',
        content: `
          import clipboard from 'vue-clipboard2'
          export default ({ Vue, router }) => {
            Vue.use(clipboard)
            Vue.component('IconDemo', () => import('${resolvePath('IconDemo.vue')}'))
          }
         `
      }
    },

    async ready() {
      const url = `https://at.alicdn.com/t/${opts.key}.css`
      const iconCSS = await requestPromise(url)
      const reg = new RegExp(`(?<=${opts.fontClass})\\w*(?=:before)`, 'g')
      const iconClasses = iconCSS.match(reg)

      const content = `
        \n# iconfont
        \n> key: ${opts.key} 
        \n${iconClasses.map(icon => `<icon-demo classs="${opts.fontClass}${icon}" fontFamily="${opts.fontFamily}"/>\n`).join('')}
      `
      await ctx.addPage({
        content,
        permalink: '/iconfont.html'
      })
    }
  }
}
