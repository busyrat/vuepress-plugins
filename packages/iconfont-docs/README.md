# vuepress-plugin-iconfont-docs

## install

```
yarn add vuepress-plugin-iconfont-docs -D
```

### set vuepress config

```js
// .vuepress/config.js
module.exports = {

  plugins: [
    ['iconfont-docs', {
      /*
       * 必须
       * iconfont 的 key 值，在 iconfont 图标库里面可以找到 at.alicdn.com/t/font_xxxxxx_xxxxx.css
       */
      key: 'font_xxxxxx_xxxxx',
      
      /*
       * 非必须配置项
       * 在 iconfont 官方图标库里面可以配置，依次点击【图标管理 - 我的项目 - 更多操作 - 编辑项目】可以找到
       */
      fontClass: 'icon-',
      fontFamily: 'iconfont'
    }]
  ]
}
```

## 查看

默认地址为：example.com/iconfont.html
