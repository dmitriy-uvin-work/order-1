<template>
  <component
    :is="tag"
    :class="modalClasses"
    ref="modal"
  >
    <slot :close="close"></slot>
  </component>
</template>

<script>
export default {
  name: 'RModal',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'div'
    },
    openClass: {
      type: String,
      required: false,
      default: 'r-modal--open'
    },
    overlay: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      skipDocumentClick: false
    }
  },
  computed: {
    modalClasses() {
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
      this.isOpen = !this.isOpen
    },
    outsideAction(methodName) {
      this[methodName]()
      this.skipDocumentClick = true
    },
    documentClick(event) {
      if (!this.skipDocumentClick) {
        const modal = this.$refs.modal
        const target = event.target

        if (target !== modal && !modal.contains(target)) {
          this.close()
        }
      }

      this.skipDocumentClick = false
    }
  },
  created() {
    document.addEventListener('click', this.documentClick)
  },
  mounted() {
    if (this.overlay) {
      const overlay = this.$refs.modal

      overlay.addEventListener('click', event => {
        if (event.target === modal) {
          this.close()
        }
      })
    }
  },
  destroyed() {
    document.removeEventListener('click', this.documentClick)
  }
}
</script>