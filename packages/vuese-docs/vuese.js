const path = require('path')
const fs = require('fs-extra')
const { Render } = require('@vuese/markdown-render')
const { parser } = require('@vuese/parser')
const { getComponents } = require('./utils')

exports.vuese = async function(opts, ctx) {
  const sourceDir = target => path.resolve(ctx.sourceDir, target).replace(/\\/g, '/')
  const componentsPath = sourceDir('./components')

  fs.removeSync(componentsPath)
  opts.edit && fs.mkdirpSync(componentsPath)

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
      // 把.demo.vue文件中<md></md>里面的内容取出
      let md = demo.match(/\<md\>([\s\S]*)\<\/md\>/)
      let demomd = ''
      if (md) {
        demo = demo.replace(md[0], '')
        demomd = md[1]
      }
      let demoContent = `\n## Demo\n`
      demoContent += `\n${demomd}\n:::demo \n\`\`\` vue \n${demo.trim()}\n\`\`\` \n:::\n`

      // 第一个二级标题是 ## Demo
      const content = markdownRes.content.split('##')
      content[0] += demoContent
      const data = `${content.join('##')}`

      // 为制作目录做准备
      componentsName.push(markdownRes.componentName)

      if (opts.edit) {
        fs.writeFileSync(`${componentsPath}/${markdownRes.componentName}.md`, data, 'utf-8')
      } else {
        await ctx.addPage({
          content: data,
          permalink: `/${opts.base}/${markdownRes.componentName}.html`
        })
      }
    })
  )

  return componentsName
}
