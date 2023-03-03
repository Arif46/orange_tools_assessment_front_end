<template>
  <b-collapse tag="ul" :class="className" :visible="open" :id="idName" :accordion="accordianName">
    <li v-show="item.hideSection !== true" v-for="(item,index) in items" :key="index" :class=" !hideListMenuTitle? 'p-0' : item.is_heading ? 'iq-menu-title' :activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''">
      <i v-if="item.is_heading && hideListMenuTitle" class="ri-subtract-line" />
      <span v-if="item.is_heading && hideListMenuTitle">{{ item.name }}</span>
      <slot v-if="!item.link">
        <a href="javascript:" v-if="!item.is_heading" :class="`${item.class_name} iq-waves-effect ${activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''}`" v-b-toggle="getFormatedName(item.name, index)">
          <i :class="item.icon" v-if="item.is_icon_class"/>
          <template v-else v-html="item.icon">
          </template>
          <span>{{ item.name }}</span>
          <i v-if="item.children" class="ri-arrow-down-s-line cus-arrow"></i>
          <small v-html="item.append" v-if="hideListMenuTitle" :class="item.append_class" />
        </a>
      </slot>
      <slot v-else>
        <router-link :to="item.link" v-if="!item.is_heading" :class="`${item.class_name} iq-waves-effect ${activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''}`">
          <i :class="item.icon" v-if="item.is_icon_class"/>
          <template v-else v-html="item.icon">
          </template>
          <span>{{ item.name }}</span>
          <i v-if="item.children" class="ri-arrow-down-s-line cus-arrow"></i>
          <small v-html="item.append" v-if="hideListMenuTitle" :class="item.append_class" />
        </router-link>
      </slot>
      <List v-if="item.children" :items="item.children" :sidebarGroupTitle="hideListMenuTitle" :open="item.link.name !== '' && activeLink(item) && item.children ? true : !!(item.link.name !== '' && activeLink(item))" :idName="getFormatedName(item.name, index)" :accordianName="`sidebar-accordion-${item.class_name}`" :className="`iq-submenu ${item.class_name}`" />
    </li>
  </b-collapse>
</template>
<script>
import List from './CollapseMenu'
export default {
  name: 'List',
  props: {
    items: Array,
    className: { type: String, default: 'iq-menu' },
    open: { type: Boolean, default: false },
    idName: { type: String, default: 'sidebar' },
    accordianName: { type: String, default: 'sidebar' },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: {
    List
  },
  computed: {
    locale: function () {
      return this.$i18n.locale
    },
    hideListMenuTitle () {
      return this.sidebarGroupTitle
    }
  },
  mounted () {
  },
  methods: {
    activeLink (item) {
      return this.getActiveLink(item, this.$route.name)
    },
    getActiveLink (item, activeRoute) {
      let active = false
      if (item.children !== undefined) {
        item.children.filter(function (child) {
          if ('/' + child.link === activeRoute) {
            active = true
          }
        })
      } else {
        if ('/' + item.link === activeRoute) {
          active = true
        }
      }
      return active
    },
    getFormatedName (name, index) {
      if (name === null || name === undefined) {
        return 'unknown_name'
      }
      const nameMenu = name.replaceAll(' ', '')
      return nameMenu + '_' + index
    }
  }
}
</script>
