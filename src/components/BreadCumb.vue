<template>
    <div class="breadcrumb-wrapper">
        <b-breadcrumb class="custom-bread" :items="breadcrumbs"></b-breadcrumb>
        <p class="time-logger">{{ $t('globalTrans.welcomeTo') }}, {{ currentLocale === 'bn' ? authUser.name_bn : authUser.name }} | <i class="ri-time-line"></i> Last Login: 1 min ago</p>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                breadcrumbs: [],
                currentUser: ''
            }
        },
        created: function () {
            var currentUrl = window.location.pathname
            const tmpBreadcumbs = currentUrl.split('/')
            tmpBreadcumbs.shift()
            const bread = []
            tmpBreadcumbs.map(item => {
                if (!Number.isInteger(parseInt(item))) {
                    bread.push({ text: item.toUpperCase().split('-').join(' ') })
                    return Object.assign({}, { text: item.toUpperCase().split('-').join(' ') })
                }
            })
            this.breadcrumbs = bread
        },
        computed: {
            ...mapGetters({
                authUser: 'Auth/authUser'
            }),
            currentLocale: function () {
                return this.$i18n.locale
            }
        }
    }
</script>
