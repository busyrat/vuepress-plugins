const { vuese } = require('./vuese')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    navIndex: 0,
    edit: false,
    entry: '',
    baseDir: './docs/.vuepress'
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
      const componentPath = '/components/'
      const componentsName = await vuese(opts, ctx)
      const nav = {
        text: 'components',
        link: componentPath + componentsName[0]
      }

      const sidebar = {
        [componentPath]: componentsName.map(name => [name, name])
      }

      let ctxSidebar = ctx.siteConfig.themeConfig.sidebar || {}
      let ctxNav = ctx.siteConfig.themeConfig.nav || []
      ctxNav.splice(opts.navIndex, 0, nav)
      ctx.siteConfig.themeConfig.sidebar = { ...ctxSidebar, ...sidebar }
      ctx.siteConfig.themeConfig.nav = ctxNav
    }
  }
}
