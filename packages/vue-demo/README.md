# vuepress-plugin-vue-demo

> vuepress 中使用类似 element-ui 官方文档的效果：在 markdown 中写 vue 组件 demo

[demo link](https://busyrat.github.io/vuepress-plugins/vue-demo/)

## install plugin

```
yarn add vuepress-plugin-vue-demo -D
```

## set vuepress config

```
// .vuepress/config.js
module.exports = {
  plugins: ['vue-demo']
}
```

## options

### demoBlockComponent

- 类型: `string`
- 默认值: `./DemoBlock.vue`

默认的组件结构和样式基本从 element 的 [DemoBlock 组件](https://github.com/ElemeFE/element/blob/0706805226/examples/components/demo-block.vue) 抽取出来的

自定义组件接收三个插槽：

- source 插入代码块组件
- description 插入代码块描述，（`::: demo` 后的内容）
- code 插入代码块源码

例如：

```vue
<template>
  <div>
    <slot name="source"></slot>
    <slot name="description"></slot>
    <slot name="code"></slot>
  </div>
</template>
```
