<template>
  <component
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: 'p'
    }
  }
}
</script>