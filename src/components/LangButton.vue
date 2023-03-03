<template>
    <div class="lang-switch-wrapper">
        <input id="language-toggle" class="check-toggle check-toggle-round-flat" type="checkbox" @click="changeLang()">
        <label for="language-toggle"></label>
        <span class="on" style="font-family: 'Poppins', sans-serif;font-size: 0.9rem;font-weight: 500;" :class="enActive">ENG</span>
        <span class="off" style="font-family: 'Nikosh';font-size: 1rem;" :class="bnActive">বাংলা</span>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created () {
    this.$i18n.locale = this.currentLocale
  },
  computed: {
    ...mapGetters({
      currentLocale: 'Setting/currentLocale'
    }),
    bnActive: function () {
      return this.currentLocale === 'bn' ? 'active' : ''
    },
    enActive: function () {
      return this.currentLocale === 'en' ? 'active' : ''
    }
  },
  methods: {
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'bn' ? 'en' : 'bn'
      this.setLocale(this.$i18n.locale)
    },
    ...mapActions({
      setLocale: 'Setting/setLocale'
    })
  }
}
</script>
