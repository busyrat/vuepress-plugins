const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
const glob = require('glob')

// 找到.demo.vue同级的index.vue
const getComponents = entry => {
  const componentDemos = glob.sync(`${entry}/**/.demo.vue`)
  const componentSources = componentDemos.map(demoPath => path.resolve(path.dirname(demoPath), 'index.vue'))

  return componentSources
}

const genNav = ({ navIndex, base }, ctx, componentsName) => {
  const nav = {
    text: base,
    link: `/${base}/${componentsName[0]}.html`
  }

  if (!ctx.siteConfig.themeConfig) {
    ctx.siteConfig.themeConfig = {}
  }
  let ctxNav = ctx.siteConfig.themeConfig.nav || []
  ctxNav.splice(navIndex, 0, nav)
  ctx.siteConfig.themeConfig.nav = ctxNav
}

const genSidebar = ({ base }, ctx, componentsName) => {
  const sidebar = {
    [`/${base}/`]: [
      {
        title: base,
        sidebarDepth: 2,
        children: componentsName.map(name => [name, name])
      }
    ]
  }
  if (!ctx.siteConfig.themeConfig) {
    ctx.siteConfig.themeConfig = {}
  }
  const ctxSidebar = ctx.siteConfig.themeConfig.sidebar || {}
  ctx.siteConfig.themeConfig.sidebar = { ...ctxSidebar, ...sidebar }
}

module.exports = {
  resolvePath,
  getComponents,
  genNav,
  genSidebar
}
