const request = require('request')
const beautify = require('js-beautify').html

const requestPromise = _url => {
  return new Promise((resolve, reject) => {
    request(_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        throw new Error('gen doc error')
      }
    })
  })
}

const formatDoc = content => {
  const demos = content.match(/:::.*?demo[\s\S]*?```[\s]*?(html|vue)?([\s\S]*?)```[\s\S]*?:::/g)
  demos.forEach(demo => {
    demo = demo.match(/:::.*?demo[\s\S]*?```[\s\S]*?(<[\s\S]*?)```[\s\S]*?:::/)[1]
    let script = demo.match(/<script[^>]*?>[\s\S]*?<\/script>/)
    script = script ? script[0] : ''
    let style = demo.match(/<style[^>]*?>[\s\S]*?<\/style>/)
    style = style ? style[0] : ''
    let html = demo.replace(script, '').trim()
    html = html.replace(style, '').trim()
    let newHtml = html.match(/^(<template[^>]*?>)?([\s\S]*?)(<\/template>)?$/)[2]
    newHtml = beautify(`<template>\n<div>${newHtml}</div>\n</template>`, { indent_size: 2 })
    content = content.replace(html, `\n${newHtml}\n`)
  })
  return content
}

const addElementUILink = (name, content, opts) => {
  // https://element.eleme.cn/2.10/#/zh-CN/component/button
  let v = opts.version.split('.')
  if (v.length < 2) {
    v.push('0')
  } else if (v.length > 2) {
    v = v.slice(0, 2)
  }
  const link = `https://element.eleme.cn/${v.join('.')}/#/zh-CN/component/${name}`
  return content.replace(/^##\s*(.+)/, `## [$1](${link})`)
}

module.exports = {
  requestPromise,
  formatDoc,
  addElementUILink
}
