<template>
  <button @click="toggleNavbar" class="navbar-toggler p-0" type="button" data-target="#main-nav-mobile" aria-controls="main-nav-mobile" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
</template>

<script>
export default {
  methods: {
    toggleNavbar() {
      this.$emit('toggleNavbar')
    }
  }
}
</script>