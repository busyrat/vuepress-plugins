// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const { hashCode, creatDemoComponent, resolvePath } = require('./utils')
const path = require('path')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    demoBlockComponent: resolvePath('DemoBlock.vue')
  }
  opts = Object.assign(defaultOpts, opts)
  return {
    name: 'vue-demo',

    enhanceAppFiles() {
      return {
        name: 'dynamic-code',
        content: `
          export default ({ Vue, router }) => {
            Vue.component('DemoBlock', () => import('${opts.demoBlockComponent}'))
          }
         `
      }
    },

    extendPageData($page) {
      let { _content: content, key, relativePath } = $page

      if (typeof content === 'string') {
        let demoCodes = content.split(/:::/).filter(s => /^\s*demo/.test(s))

        demoCodes.forEach(async (code, index) => {
          let t = code.split(/```[\s\S]*?(?=\<)/)
          if (t.length > 1) {
            code = t.slice(1).join('')
          }

          const tagName = `demo-block-${relativePath ? hashCode(relativePath) : key}-${index}`
          await creatDemoComponent(ctx, code, tagName)
        })
      }
    },

    extendMarkdown(md) {
      containers(md, ctx)
    },

    plugins: [
      [
        '@vuepress/register-components',
        {
          componentsDir: path.resolve(ctx.tempPath, 'dynamic/demo')
        }
      ]
    ]
  }
}
