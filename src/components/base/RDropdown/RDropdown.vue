<template>
  <component
    :is="tag"
  >
    <slot name="header" :open="open" :close="close" :toggle="toggle"></slot>

    <r-modal
      ref="dropdownBody"
      open-class="dropdownCampaignShow"
      class="campaign-active-settings"
    >
      <slot></slot>
    </r-modal>
  </component>
</template>

<script>
import RModal from '@/components/base/RModal/RModal'

export default {
  name: 'RDropdown',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'div'
    }
  },
  methods: {
    open() {
      const dropdownBody = this.$refs.dropdownBody

      dropdownBody.outsideAction('open')
    },
    close() {
      const dropdownBody = this.$refs.dropdownBody

      dropdownBody.outsideAction('close')
    },
    toggle(title) {
      console.log(title + ' toggle')
      const dropdownBody = this.$refs.dropdownBody

      dropdownBody.outsideAction('toggle')
    }
  },
  components: {
    RModal
  }
}
</script>