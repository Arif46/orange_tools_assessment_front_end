<template>
  <div class="role-select-wrapper">
    <div class="role-select">
      <img class="img-fluid d-block mx-auto" width="100" src="@/assets/images/pos.png" alt="">
      <h5 class="text-center mt-3 mb-2">Multivendor POS System</h5>
      <b-alert :show="errorAlert" variant=" " dismissible fade class="text-white bg-danger">
        <div class="iq-alert-text"><i class="ri-information-line"></i> {{ errorMsg }}</div>
      </b-alert>
      <div class="text-center" v-if="loading">
        <b-overlay :show="loading">
          {{ message }}
        </b-overlay>
      </div>
      <div class="col-12" v-if="userRoles.length > 1">
        <p class="mb-0 text-center login-text">{{ $t('authentication.selectRole') }}</p>
        <hr/>
        <slot v-for="(userRole, index) in userRoles">
          <b-form-radio
            :key="index"
            class="col-form-label-sm mb-0"
            @change="userRoleSelect(userRole.id)"
            name="checked"
            :unchecked-value=false
          >
            {{ ($i18n.locale === 'bn') ? userRole.role_name_bn  :  userRole.role_name  }}
          </b-form-radio>
        </slot>
        <slot>
          <hr/>
          <button class="btn btn-primary btn-block" v-on:click="SubmitData()">{{ $t('globalTrans.submit') }}</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import RestApi, { authServiceBaseUrl, commonServiceBaseUrl } from '@/config/api_config'
import { authUserRolesApi, componentsByRoleApi, componentsOfSuperAdminApi } from '../api/routes'

export default {
  data: () => ({
    loading: true,
    errorAlert: false,
    errorMsg: '',
    message: '',
    userRoles: [],
    selectedRole: 0
  }),
  computed: {
    currentLocale () {
      return this.$i18n.locale
    }
  },
  created () {
    this.$store.dispatch('Auth/setActiveRole', 0)
    this.getUserRoles()
  },
  methods: {
    getUserRoles () {
      this.message = this.$t('authentication.checkingRole')
      const authUserId = this.$store.state.Auth.authUser.user_id
      RestApi.getData(authServiceBaseUrl, `${authUserRolesApi}/${authUserId}`, {}).then(response => {
        this.userRoles = response.data
        const totalRoles = this.userRoles.length
        this.$store.dispatch('Auth/setAuthUserRoles', this.userRoles)

        if (totalRoles === 0) {
          this.$toast.error({
            title: 'Error',
            message: this.$t('authentication.noRoles')
          })
          this.$router.push('/auth/login')
        } else if (totalRoles === 1) {
          this.selectedRole = this.userRoles[0].id
          this.getComponentsByRole()
          return
        }
        this.loading = false
      })
    },
    SubmitData () {
      if (this.selectedRole) {
        this.getComponentsByRole()
      } else {
        this.errorAlert = true
        this.errorMsg = this.$t('authentication.selectRole')
      }
    },
    userRoleSelect (roleId) {
      this.selectedRole = roleId
    },
    getComponentsByRole () {
      let baseUrl = authServiceBaseUrl
      let api = `${componentsByRoleApi}/${this.selectedRole}`
      if (this.selectedRole === 1) {
        baseUrl = commonServiceBaseUrl
        api = componentsOfSuperAdminApi
      }

      this.loading = true
      this.message = this.$t('authentication.checkingPermissions')
      RestApi.getData(baseUrl, api).then(response => {
        if (!response.success) {
          this.$toast.error({
            title: 'Error',
            message: this.$t(response.message_i18n_code)
          })
          this.$router.push('/auth/login')
          return
        } else if (response.data.length === 0) {
          this.$toast.error({
            title: 'Error',
            message: this.$t('authentication.noPrivilege')
          })
          this.$router.push('/auth/login')
          return
        }
        this.$store.dispatch('Auth/setActiveRole', this.selectedRole)
        this.$store.dispatch('Auth/setAuthorizedShops', response.data)
        this.loading = false
        // if (this.$store.state.Auth.authUser.dashboard_user !== 0) {
        //   this.$router.push('/ministry/dashboard/fertilizer')
        // } else {
          this.$router.push('/auth/dashboard')
        // }
      }, error => {
        this.loading = false
        this.$router.push('/auth/login')
        if (error) {
          //
        }
      })
    }
  }
}
</script>
