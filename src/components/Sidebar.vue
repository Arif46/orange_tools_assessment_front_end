<template>
    <div class="sidebar-wrapper">
        <router-link :to="getHomeUrl()" class="logo-route">
            <div class="logo-wrapper">
                <img src="../assets/images/pos.png" class="logo-img" alt="">
                <h2 class="title">IDSDP</h2>
            </div>
        </router-link>
        <div class="sidebar-navigation">
            <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
        </div>
    </div>
</template>
<script>
import CollapseMenu from './menus/CollapseMenu.vue'
import { mapGetters } from 'vuex'
import { EventBus } from '@/EventBusLayout'
export default {
    Name: 'Sidebar',
    props: ['name'],
    components: {
        CollapseMenu
    },
    data () {
        return {
            homeURL: { type: Object, default: () => ({ path: '/auth/dashboard' }) },
            logo: { type: String, default: require('../assets/images/pos.png') },
            horizontal: true,
            toggleButton: true,
            logoShow: true,
            onlyLogo: true,
            onlyLogoText: true,
            sidebarGroupTitle: true
        }
    },
    beforeMount () {
        /** This EventBus should emitted before loading menus of external panels
         * for those user whose profile not updated yet */
        EventBus.$on('RESET_EXTERNAL_MENUS', this.resetExternalMenus)
    },
    computed: {
        items: function () {
            return this.$store.state.Auth.activeMenus
        },
        lang: function () {
            return this.$i18n.locale
        },
        ...mapGetters({
            authUser: 'Auth/authUser',
            isInsidePanel: 'ExternalUserService/isInsidePanel'
        })
    },
    methods: {
        getHomeUrl () {
            if (this.authUser.user_type === 1) {
                return '/auth/dashboard'
            } else {
                return '/external-user/panel'
            }
        }
    }
}
</script>
