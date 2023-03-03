<template>
  <div>
    <breadcumb />
    <div :class="'card ' + className">
      <slot name="cardImage"/>
      <div v-if="hasSearchHeaderTitleSlot || hasSearchHeaderActionSlot" :class="'card-header d-flex justify-content-between '+headerClass">
        <div class="header-title">
          <slot name="searchHeaderTitle" />
        </div>
        <div class="card-header-toolbar d-flex align-items-center">
          <slot name="searchHeaderAction" />
        </div>
      </div>
      <b-card-body :body-class="'' + bodyClass" v-if="hasTableBodySlot">
        <div class="table-wrapper">
          <slot name="searchBody" />
        </div>
      </b-card-body>
      <slot />
      <div v-if="hasFooterSlot" :class="'card-footer' + footerClass">
        <slot name="footer"/>
      </div>
    </div>
    <!-- <div class="form-wrapper">
        <b-card v-if="hasSearchHeaderTitleSlot">
          <slot name="searchHeaderTitle" />
          <b-card-text v-if="hasSearchBodySlot">
            <slot name="searchBody" />
          </b-card-text>
        </b-card>
        <div class="d-flex align-items-center" v-if="hasHeaderActionSlot">
          <slot name="headerAction" />
        </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'iq-card',
  props: {
    className: { type: String, default: '' },
    bodyClass: { type: String, default: '' },
    headerClass: { type: String, default: '' },
    footerClass: { type: String, default: '' }
  },
  mounted () {
  },
  computed: {
    hasSearchHeaderTitleSlot () {
      return !!this.$slots.searchHeaderTitle
    },
    hasSearchHeaderActionSlot () {
      return !!this.$slots.searchHeaderAction
    },
    hasSearchBodySlot () {
      return !!this.$slots.searchBody
    },
    hasTableHeaderTitleSlot () {
      return !!this.$slots.tableHeaderTitle
    },
    hasTableBodySlot () {
      return !!this.$slots.searchBody
    },
    hasFooterSlot () {
      return !!this.$slots.footer
    }
  }
}
</script>
