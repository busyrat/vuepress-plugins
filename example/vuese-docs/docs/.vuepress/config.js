const path = require('path')
const DOCS_DIR = (dir = '') => path.join(__dirname, '../', dir).replace(/\\/g, '/')
module.exports = {
  base: '/vuepress-plugins/vuese-docs/',
  dest: '../../dist/vuese-docs/',
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
