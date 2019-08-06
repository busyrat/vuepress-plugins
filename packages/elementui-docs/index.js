const fs = require('fs-extra')
const path = require('path')
const { requestPromise, formatDoc, addElementUILink, genNav, genSidebar } = require('./utils')
const extendPage = require('./last-updated')

module.exports = (opts, ctx) => {
  const defaultOpts = {
    include: ['button', 'radio', 'input-number'],
    cache: true,
    version: '2.10.1',
    base: 'ele',
    navIndex: 0,
    genNav: true,
    genSidebar: true
  }
  opts = Object.assign(defaultOpts, opts)

  const sourceDir = target => path.resolve(ctx.sourceDir, target).replace(/\\/g, '/')

  const BASE_URL = `https://raw.githubusercontent.com/ElemeFE/element/v${opts.version}/examples/docs/zh-CN`

  return {
    name: 'elementui-docs',

    extendPageData($page) {
      extendPage($page, opts)
    },

    async ready() {
      if (opts.cache) {
        fs.mkdirpSync(sourceDir(`./.cache`))
      }
      await Promise.all(
        opts.include.map(async name => {
          let content = ''
          if (opts.cache) {
            try {
              content = fs.readFileSync(sourceDir(`./.cache/${name}.md`), 'utf-8')
            } catch (e) {
              content = formatDoc(await requestPromise(`${BASE_URL}/${name}.md`))
              fs.writeFileSync(sourceDir(`./.cache/${name}.md`), content, 'utf-8')
            }
          } else {
            content = formatDoc(await requestPromise(`${BASE_URL}/${name}.md`))
          }

          content = addElementUILink(name, content, opts)

          let filePath = sourceDir(`./.${opts.base}/${name}.md`)
          try {
            extendContent = fs.readFileSync(filePath, 'utf-8')
          } catch (error) {
            extendContent = ''
            filePath = null
          }

          content += `\n${extendContent}`

          await ctx.addPage({
            content,
            permalink: `/${opts.base}/${name}.html`,
            meta: { filePath }
          })
        })
      )

      if (opts.genNav) {
        genNav(opts, ctx)
      }
      if (opts.genSidebar) {
        genSidebar(opts, ctx)
      }
    }
  }
}
