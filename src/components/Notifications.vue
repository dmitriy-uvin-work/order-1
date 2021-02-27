<template>
  <r-modal
    ref="modal"
    open-class="displayFlex"
    class="notificationsContainer"
    id="notificationsContainer"
  >
    <template #default="{ close }">
      <div class="notificationsContainerHeader">
        <p class="left font-la-nord-bold">NOTIFICATIONS</p>
        <p @click="close" class="right orangeText">X</p>
      </div>
      
      <div class="userChatHeader">
        <r-dropdown
          v-for="(notification, index) of notificationsList"
          :key="index"
          class="notificationContainer"
        >
          <template #header="{ toggle: toggleMethod }">
            <div class="notificationOrangeCircle"></div>
            <div class="profilePic">
              <img :src="notification.image" class="influencerPicture">
            </div>
            <div class="notificationInfo">
              <div class="nameAndTime">
                <p class="notificationTitle" v-html="notification.title"></p>
              </div>
              <div class="notificationShortMessage">
                <p v-html="notification.message"></p>
              </div>
            </div>

            <img
              @click="toggleMethod(notification.title)"
              src="@/assets/icons/ellipsis.svg"
              class="elipsis"
            >
          </template>
          
          <r-dropdown-item :ref="'dropdown' + index">Read</r-dropdown-item>
          <r-dropdown-item @click="removeNotification(index)">Delete</r-dropdown-item>
          <r-dropdown-item>Report an issue</r-dropdown-item>
        </r-dropdown>
      </div>
    </template>
  </r-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import RModal from '@/components/base/RModal/RModal'

import RDropdown from '@/components/base/RDropdown/RDropdown'
import RDropdownItem from '@/components/base/RDropdown/RDropdownItem'

export default {
  computed: {
    ...mapState({
      notificationsList: state => state.notifications.list
    })
  },
  methods: {
    toggle() {
      const modal = this.$refs.modal

      modal.outsideAction('toggle')
    },
    ...mapMutations([
      'removeNotification'
    ])
  },
  mounted() {
    console.log(this.$refs.dropdown0[0])
  },
  components: {
    RModal,
    RDropdown,
    RDropdownItem
  }
}
</script>