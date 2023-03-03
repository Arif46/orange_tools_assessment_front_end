<template>
  <div id="app" :class="fontClass">
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    fontClass: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    }
  }
}
</script>
