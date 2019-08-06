const container = require('markdown-it-container')
const mdit = require('markdown-it')()
const { hashCode, creatDemoComponent } = require('./utils')

module.exports = (md, ctx) => {
  tagNameIndex = 0

  const validate = params => {
    return params.trim().match(/^demo\s*(.*)$/)
  }

  const render = (tokens, idx, options, env, self) => {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : ''
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''

      const isNewPage = tokens.slice(0, idx).filter(_ => _.type === 'container_demo_open').length === 0
      if (isNewPage) {
        tagNameIndex = 0
      } else {
        tagNameIndex++
      }
      let key = env.relativePath.match(/temp-pages\/(.*?)\.md/)
      if (key) {
        key = key[1]
      } else {
        key = hashCode(env.relativePath)
      }
      const tagName = `demo-block-${key}-${tagNameIndex}`
      creatDemoComponent(ctx, content, tagName)

      return `<demo-block>
        <template slot="source"><${tagName}/></template>
        ${description ? `<div>${mdit.render(description)}</div>` : ''}
        <template slot="code">
      `
    }
    return '</template></demo-block>'
  }

  md.use(container, 'demo', { render, validate })
}
