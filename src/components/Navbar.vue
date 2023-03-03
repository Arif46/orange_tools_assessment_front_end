<template>
    <div>
      <b-navbar toggleable="lg" class="fixed-nav">
        <b-navbar-brand  v-if="layout !== 'Home'" href="javascript:" class="d-none d-md-block sidebar-collapse-icon-wrapper" @click="toggleNav()">
          <i class="ri-menu-3-fill"></i>
        </b-navbar-brand>
        <b-navbar-brand v-b-toggle.sidebar-1 v-if="layout !== 'Home'"  href="javascript:" class="d-sm-block d-md-none sidebar-collapse-icon-wrapper">
          <i class="ri-menu-3-fill toggle-bar-icon"></i>
        </b-navbar-brand>
        <b-navbar-brand href="javascript:" class="logo-wrapper">
          <img v-if="layout === 'Home'" src="../assets/images/orangeTools.png" class="mr-2" width="42" alt="">
          <span>OrangeTools Assessment</span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <!-- <LangButton /> -->
            <Notification />
            <SitePreference />
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-sidebar id="sidebar-1" shadow backdrop>
        <div class="sidebar-section w-100 show-mobile d-sm-block d-md-none">
          <Sidebar></Sidebar>
        </div>
      </b-sidebar>
    </div>
</template>
<script>
import { EventBus } from '@/EventBusLayout'
import Sidebar from '@/components/Sidebar.vue'
// import LangButton from '@/components/LangButton.vue'
import Notification from '@/components/Notification.vue'
import SitePreference from '@/components/SitePreference.vue'
export default {
  Name: 'Navbar',
  props: ['layout'],
  data () {
    return {
      toggle: false
    }
  },
  components: {
    Sidebar,
    // LangButton,
    Notification,
    SitePreference
  },
  methods: {
    toggleNav () {
      this.toggle = !this.toggle
      EventBus.$emit('toggleNav', this.toggle)
    }
  }
}
</script>
