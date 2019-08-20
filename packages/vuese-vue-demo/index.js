const { vuese } = require('./vuese')
const { genNav, genSidebar } = require('./utils')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    entry: undefined,
    base: 'components',
    navIndex: 0,
    genNav: true,
    genSidebar: true,
    edit: false
  }
  opts = Object.assign(defaultOpts, opts)
  return {
    name: 'vuese-vue-demo',

    enhanceAppFiles() {
      return {
        name: 'entry-component',
        content: `
          const requireComponent = require.context('${opts.entry}', true, /.*.vue$/)
          export default ({ Vue, router }) => {
            requireComponent.keys().forEach(fileName => {
              const componentConfig = requireComponent(fileName)
              const component = componentConfig.default
              Vue.component(component.name, component)
            })
          }
         `
      }
    },

    async ready() {
      const componentsName = await vuese(opts, ctx)

      if (opts.genNav) {
        genNav(opts, ctx, componentsName)
      }
      if (opts.genSidebar) {
        if (typeof opts.genSidebar === 'function') {
          opts.genSidebar(componentsName)
        } else {
          genSidebar(opts, ctx, componentsName)
        }
      }
    }
  }
}
