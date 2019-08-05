const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')

const hashCode = s => {
  return s.split('').reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

const creatDemoComponent = async (ctx, content, name) => {
  const isHTML = /\`\`\`\s*html/.test(content)
  const isPlainComponent = /^\s*\<template\>/.test(content) || /\`\`\`/.test(content)
  const wrapTemplate = code => `<template>\n<div>\n${code}\n</div>\n</template>`
  if (isHTML) {
    content = content.replace(/\`\`\`\s*html([\s\S]*)\`\`\`/, wrapTemplate('$1'))
  } else if (!isPlainComponent) {
    content = wrapTemplate(content)
  }
  await ctx.writeTemp(`dynamic/demo/${name}.vue`, content, { encoding: 'utf8' })
}

module.exports = {
  resolvePath,
  hashCode,
  creatDemoComponent
}
