
<template>
  <button class="btn-fb-lg position-relative" @click="logInWithFacebook">
    <img
      src="@/assets/icons/icon-awesome-facebook-f.svg"
      alt="Facebook icon"
      class="fb-icon position-absolute"
    />
    {{ signup ? "Sign up with Facebook" : "Login with Facebook" }}
  </button>
</template>
<script>
import { getUserRedirectURL } from '@/utils'

export default {
  name: "FBLogin",

  props: {
    signup: Boolean
  },

  methods: {
    async logInWithFacebook() {
      window.FB.login(response => {
        if (response.authResponse) {
          console.log({ response });
          // alert("You are logged in &amp; cookie set!");
          const payload = {
            socialId: response.userId,
            accessToken: response.accessToken,
          };

          if (signup) {
            payload.userType = "?"
          }

          // got FB token now try to login user on our backend
          this.$http
            .post("/user/login/social", payload)
            .then((res) => {
              console.log('/user/login/social', res);
              // if user doesnt exist yet send him to signup 
              if (res.data.needAccountType) {
                this.$router.push("/signup");
              }
              else {
                // otherwise log him in and redirect
                this.$store.dispatch("socialLogin", res.data);
                const status = res.data.loginStatus;
                const userType = res.data.redirect;
                const url = getUserRedirectURL(status, userType);
                this.$router.push(url);
              }
            });
        } else {
          console.log("User cancelled FB login or did not fully authorize.");
        }
      });
      return false;
    },
  },
  created() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.VUE_APP_FB_APPID,
        cookie: true, // This is important, it's not enabled by default
        version: "v10.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
};
</script>