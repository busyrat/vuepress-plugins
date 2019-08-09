# vuepress-plugin-elementui-docs

> 把 elementui 文档转成 vuepress 文档，并支持文档内容扩展

搭配 vuepress-plugin-vue-demo 一起使用

## install

```
yarn add vuepress-plugin-elementui-docs vuepress-plugin-vue-demo -D
```

## set vuepress config

```
// .vuepress/config.js
module.exports = {
  plugins: ['vue-demo', 'elementui-docs']
}
```

## import element-ui
```
yarn add element-ui
```

```js
// .vuepress/enhanceApp.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
```

## options

### include

- 类型: `array`
- 默认值: `['button', 'radio', 'input-number']`

需要展示的组件，会自动把官方文档拉取到本地

约定以`!`开头的模块，只读本地文档，不合并官方文档

### cache

- 类型: `boolean`
- 默认值: `true`

默认把已经下载的文档缓存起来

### version

- 类型: `string`
- 默认值: `2.10.1`

elementui 的版本

### base

- 类型: `string`
- 默认值: `ele`

生成的页面的路由为：`http://xxx/ele/button.html`

### genNav

- 类型: `boolean`
- 默认值: `true`

生成默认的导航栏链接

### navIndex

- 类型: `number`
- 默认值: `0`

如果使用默认的导航栏配置，就可以通过这个属性设置位置，如果是负数则倒数

### genSidebar

- 类型: `boolean`
- 默认值: `true`

生成默认的侧边栏

### transformer

参考 [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated)
