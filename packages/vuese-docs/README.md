# vuepress-plugin-vuese-docs

> 基于 vuese 自动生成项目组件文档

搭配 vuepress-plugin-vue-demo 一起使用

## install

```
yarn add vuepress-plugin-vuese-docs vuepress-plugin-vue-demo -D
```

## set vuepress config

```
// .vuepress/config.js
module.exports = {
  plugins: ['vue-demo', 'vuese-docs']
}
```

## options

### entry

- 类型: `string`
- 默认值: `undefined`

项目组件的根目录，必传

### base

- 类型: `string`
- 默认值: `components`

生成的页面的路由为：`http://xxx/components/button.html`

### genNav

- 类型: `boolean`
- 默认值: `true`

生成默认的导航栏链接

### navIndex

- 类型: `number`
- 默认值: `0`

如果使用默认的导航栏配置，就可以通过这个属性设置位置，如果是负数则倒数

### genSidebar

- 类型: `boolean|function`
- 默认值: `true`

生成默认的侧边栏；也支持自定义侧边栏，回调函数会传回所有组件的组件名
