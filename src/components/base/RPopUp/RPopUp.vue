<template>
  <component
    :is="tag"
    :class="rootClasses"
  >
    <slot
      :open="open"
      :close="close"
      :toggle="toggle"
    ></slot>
  </component>
</template>

<script>
import { tagIs } from '@/mixins/tagIs'

export default {
  name: 'RPopUp',
  mixins: [
    tagIs
  ],
  props: {
    openClass: {
      type: String,
      default: 'r-pop-up--open',
      required: false
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  skipDocumentClick: false,
  computed: {
    rootClasses() {
      return {
        [this.openClass]: this.isOpen
      }
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    toggle() {
      this.isOpen ? this.close() : this.open()
    },
    outsideAction(methodName) {
      this[methodName]()
      this.$options.skipDocumentClick = true
    },
    documentClick(event) {
      const options = this.$options

      if (!options.skipDocumentClick) {
        const $root = this.$el
        const $target = event.target

        if ($target !== $root && !$root.contains($target)) {
          this.close()
        }
      } else {
        options.skipDocumentClick = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.documentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick)
  }
}
</script>