<template>
<div>
<div class="mobile-menu-overlay position-fixed" :class="{active: mobileMenuActive}"></div>
  <header class="bg-custom-light" id="top">
    <div class="container">
      <nav class="navbar navbar-expand-lg px-0">
        <a class="navbar-brand text-dark" href="/">
          <h1 class="text-uppercase display-5 m-0">Ravyyn</h1>
        </a>
        <button
          class="navbar-toggler p-0"
          @click="openMenu"
          type="button"
          data-target="#main-nav-mobile"
          aria-controls="main-nav-mobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar w-100" id="main-nav">
          <ul class="navbar-nav w-100">
            <li class="nav-item active">
              <a class="nav-link" href="#advertiser">Advertiser</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#influencer">Influencer</a>
            </li>
            <li v-if="!isLoggedIn" class="nav-item ml-auto">
              <router-link to="/login" class="nav-link">Log In</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link
                to="/signup"
                class="signup-btn nav-link btn text-white d-lg-block d-inline-block mb-lg-0 mb-3 sign-up-btn"
              >
                Sign Up For Free!
              </router-link>
            </li>
          </ul>
        </div>

      <!-- Mobile view -->
        <div class="w-100 d-flex" id="main-nav-mobile" :class="{ active: mobileMenuActive }">
          <button class="position-absolute" id="menu-close-btn" @click="closeMenu">
            <span class="sr-only">Menu close button</span>
          </button>
          <div class="navbar p-0 h-100">
            <ul class="navbar-nav w-100 h-100">
              <div class="top-section bg-white border-bottom border-dark pb-3">
                <li class="nav-item active">
                  <a class="nav-link" href="#advertiser" @click="closeMenu">Advertisers</a>
                </li>
                <li class="nav-item">
                  <router-link to="/faq" class="nav-link display-5 ls-3">
                    FAQ
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/contact-us" class="nav-link display-5 ls-3">
                    Contact
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/blog"
                    class="nav-link text-capitalize display-5 ls-3"
                  >
                    Blog
                  </router-link>
                </li>
              </div>
              <div class="lower-section bg-custom-light h-100">
                <li v-if="!isLoggedIn" class="nav-item">
                  <router-link to="login" class="nav-link">Log In</router-link>
                </li>
                <li v-if="!isLoggedIn" class="nav-item" >
                  <router-link
                    to="signup"
                    class="signup-btn nav-link btn text-white d-lg-block d-inline-block mb-lg-0 mb-3 sign-up-btn"
                  >
                    Sign Up For Free!
                  </router-link>
                </li>
              </div>
            </ul>
          </div>
          <div @click="closeMenu" class="outside"></div>
        </div>
      </nav>
    </div>
  </header>
</div>
</template>

<script>
export default {
  name: "Header",

  data () {
    return {
      mobileMenuActive: false
    }
  },

  computed: {
    isLoggedIn() {
      return false
      // return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    closeMenu () {
      this.mobileMenuActive = false;
    },
    openMenu () {
      this.mobileMenuActive = true
    }
  },

  watch:{
    $route (to, from) {
      this.closeMenu();
    }
  }
};
</script>