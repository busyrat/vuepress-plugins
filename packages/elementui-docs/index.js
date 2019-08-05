const fs = require('fs-extra')
const path = require('path')
const { requestPromise, formatDoc, addElementUILink } = require('./utils')
const extendPage = require('./last-updated')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    navIndex: 0,
    include: ['button', 'radio', 'input-number'],
    cache: true,
    baseDir: './docs/.vuepress',
    version: '2.10.1'
  }
  opts = Object.assign(defaultOpts, opts)

  const basePath = target => path.resolve(process.cwd(), opts.baseDir, target).replace(/\\/g, '/')

  const BASE_URL = `https://raw.githubusercontent.com/ElemeFE/element/v${opts.version}/examples/docs/zh-CN`

  return {
    name: 'elementui-docs',

    extendPageData($page) {
      extendPage($page, opts)
    },

    async ready() {
      fs.mkdirpSync(basePath(`../.cache`))
      await Promise.all(
        opts.include.map(async name => {
          let content = ''
          if (opts.cache) {
            try {
              content = fs.readFileSync(basePath(`../.cache/${name}.md`), 'utf-8')
            } catch (e) {
              content = formatDoc(await requestPromise(`${BASE_URL}/${name}.md`))
              fs.writeFileSync(basePath(`../.cache/${name}.md`), content, 'utf-8')
            }
          } else {
            content = formatDoc(await requestPromise(`${BASE_URL}/${name}.md`))
          }

          content = addElementUILink(name, content, opts)

          let filePath = basePath(`../.ele/${name}.md`)
          try {
            extendContent = fs.readFileSync(filePath, 'utf-8')
          } catch (error) {
            extendContent = ''
            filePath = null
          }

          content += `\n${extendContent}`

          await ctx.addPage({
            content,
            permalink: `/ele/${name}.html`,
            meta: { filePath }
          })
        })
      )

      const nav = {
        text: 'ele',
        link: '/ele/' + opts.include[0]
      }

      const sidebar = {
        ['/ele/']: [
          {
            title: `element-ui v${opts.version}`,
            sidebarDepth: 2,
            children: opts.include.map(name => [name, name])
          }
        ]
      }

      let ctxSidebar = ctx.siteConfig.themeConfig.sidebar || {}
      let ctxNav = ctx.siteConfig.themeConfig.nav || []
      ctxNav.splice(opts.navIndex, 0, nav)
      ctx.siteConfig.themeConfig.sidebar = { ...ctxSidebar, ...sidebar }
      ctx.siteConfig.themeConfig.nav = ctxNav
    }
  }
}
