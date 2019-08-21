// copy from https://github.com/vue-contrib/vuese/blob/monorepo/samples/components/Component.vue
<template>
  <div id="main">{{ title }}</div>
</template>

<script>
// Component item
export default {
  name: 'Comp',
  props: {
    // The component title
    title: String
  },
  data: () => ({
    /**
     * @vuese
     * A string value that does something
     */
    vueStringData: 'data',
    /**
     * @vuese
     * A function that does nothing
     */
    localFunction: () => {}
  }),
  computed: {
    /**
     * @vuese
     * Reverses string
     * @type Array
     */
    reversedMessage: function() {
      return this.vueStringData
        .split('')
        .reverse()
        .join('')
    },
    /**
     * @vuese
     * Returns a value from store
     * @type Array
     */
    storeValue() {
      return this.$store.state.value
    }
  },
  watch: {
    /**
     * @vuese
     * Watches question
     * @arg val - the value
     */
    question: function(val) {
      this.debouncedGetAnswer()
    }
  },
  methods: {
    /**
     * @vuese
     * Do something
     * @arg val - the value
     */
    OnDoSomething(value) {
      value++
    }
  }
}
</script>