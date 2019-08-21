module.exports = {
  base: '/vuepress-plugins/elementui-docs/',
  dest: '../../dist/elementui-docs/',
  themeConfig: {
    nav: [{ text: 'github', link: 'https://github.com/busyrat/vuepress-plugins/tree/master/example/elementui-docs' }]
  },
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
