<template>
    <b-nav-item-dropdown right>
        <template #button-content>
        <div class="user-dropdown-wrapper">
            <img src="../assets/images/man.png" class="profile-img" alt="">
            <div class="user-name-wrapper">
            <p class="user-name">{{ currentLocale === 'bn' ? authUser.name_bn : authUser.name }}</p>
            <span class="user-role">Admin</span>
            </div>
        </div>
        </template>
        <p class="user-disc">{{ currentLocale === 'bn' ? authUser.name_bn : authUser.name }}</p>
        <b-dropdown-item href="#"><i class="ri-user-3-line"></i> User Profile</b-dropdown-item>
        <b-dropdown-item href="#"><i class="ri-tools-fill"></i> Settings</b-dropdown-item>
        <b-dropdown-item href="#"><i class="ri-lock-password-line"></i> Change Password</b-dropdown-item>
        <b-dropdown-item class="log-out-btn"><i class="ri-logout-circle-r-line"></i>
        <a href="javascript:void(0)" @click="logout"> Log Out</a>
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SitePreference',
  created () {
    if (this.authUser === null) {
      this.logout()
    }
  },
  computed: {
    currentLocale () {
      return this.$i18n.locale
    },
    authUser: function () {
      return this.$store.state.Auth.authUser
    },
    ...mapGetters({
      authUserRoles: 'Auth/getAuthUserRoles',
      authUserActiveRoleId: 'Auth/getActiveRole'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('Auth/updateAuthUser', null)
      localStorage.removeItem('access_token')
      this.$router.push('/auth/login')
    }
  }
}
</script>
