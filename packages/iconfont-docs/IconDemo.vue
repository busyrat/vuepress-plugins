<template>
  <div class="icon-demo" @click="copy(classs)" :title="classs">
    <i v-if="color" :class="[fontFamily, classs]" :style="styles"></i>
    <svg v-else aria-hidden="true" :style="styles">
      <use :xlink:href="`#${classs}`"></use>
    </svg>
    <div class="info">{{ classs }}</div>
  </div>
</template>
<script>
// 基于 iconfont 封装的字体图标，支持彩色
export default {
  name: 'IconDemo',
  props: {
    // 图标颜色
    color: String,
    // 图标大小
    size: {
      type: String | Number,
      default: '60px'
    },
    // 图标的名字，从 iconfont 仓库复制名字
    classs: String,

    fontFamily: String
  },

  methods: {
    copy(classs) {
      this.$copyText(classs)
        .then(() => {
          this.$message(`copy: ${classs}`)
        })
        .catch(() => {
          this.$message.error('copy error')
        })
    }
  },

  computed: {
    styles() {
      let style = {}
      if (this.color) {
        if (this.size) {
          style['font-size'] = this.size
        }
        style['color'] = this.color
      } else {
        style['width'] = this.size
        style['height'] = this.size
      }
      return style
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-demo {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 0 10px 10px 0;
  border: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  .info {
    text-align: center;
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
i {
  font-size: 20px;
}
svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
  overflow: hidden;
}
</style>
