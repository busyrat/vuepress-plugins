module.exports = {
  base: '/vuepress-plugins/elementui-docs/',
  dest: '../../dist/elementui-docs/',
  plugins: [
    'vue-demo',
    [
      'elementui-docs',
      {
        cache: false
      }
    ]
  ]
}
