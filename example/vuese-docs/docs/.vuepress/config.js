const path = require('path')
const DOCS_DIR = (dir = '') => path.join(__dirname, '../', dir).replace(/\\/g, '/')
module.exports = {
  base: '/vuepress-plugins/vuese-docs/',
  dest: '../../dist/vuese-docs/',
  themeConfig: {
    nav: [{ text: 'github', link: 'https://github.com/busyrat/vuepress-plugins/tree/master/example/vuese-docs' }]
  },
  plugins: [
    ['vue-demo'],
    [
      'vuese-docs',
      {
        entry: DOCS_DIR('../components'),
        base: '组件'
      }
    ]
  ]
}
