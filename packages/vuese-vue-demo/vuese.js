const path = require('path')
const fs = require('fs-extra')
const rimraf = require('rimraf')
const { Render } = require('@vuese/markdown-render')
const { parser } = require('@vuese/parser')
const { getComponents, mkdirpSync, basePath } = require('./utils')

exports.vuese = async function(opts, ctx) {
  rimraf.sync(basePath(opts.baseDir, `../components`))

  let componentPath = ''
  if (opts.edit) {
    componentPath = fs.mkdirpSync(basePath(opts.baseDir, `../components`))
  }
  const componentSources = getComponents(opts.entry)

  const componentsName = []

  await Promise.all(
    componentSources.map(async sourcePath => {
      const demoPath = path.resolve(path.dirname(sourcePath), '.demo.vue')
      const source = fs.readFileSync(sourcePath, 'utf-8')
      let demo = fs.readFileSync(demoPath, 'utf-8')
      const parserRes = parser(source)
      // 创建渲染实例
      const r = new Render(parserRes)
      // 渲染完整的 markdown 文本，返回值是 markdown 字符串
      const markdownRes = r.renderMarkdown()
      let md = demo.match(/\<md\>([\s\S]*)\<\/md\>/)
      let demomd = ''
      if (md) {
        demo = demo.replace(md[0], '')
        demomd = md[1]
      }
      let demoContent = `\n## Demo\n`
      demoContent += `\n${demomd}\n\:\:\:demo \n\`\`\` vue \n${demo.trim()}\n\`\`\` \n\:\:\:\n`
      const content = markdownRes.content.split('##')
      // 第一个二级标题是 ## Demo
      content[0] += demoContent
      const data = `${content.join('##')}`

      // 为制作目录做准备
      componentsName.push(markdownRes.componentName)

      if (opts.edit) {
        fs.writeFileSync(`${componentPath}/${markdownRes.componentName}.md`, data, 'utf-8')
      } else {
        await ctx.addPage({
          content: data,
          permalink: `/components/${markdownRes.componentName}.html`
        })
      }
    })
  )

  return componentsName
}
