<template>
    <div class="home-component-wrapper">
        <div class="main-wrapper">
            <div class="main-content-section home-logo-wrapper">
                <Header :layout="'Home'"></Header>
            </div>
        </div>
        <div class="component-wrapper">
            <b-container fluid>
                <b-row>
                    <b-col v-if="loader" class="col-md-12 text-center">
                        <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                        </div>
                        <br/>
                        <p class="loading-text">{{ $t('authentication.loadingMenus') }}</p>
                    </b-col>
                    <b-col v-else sm="12" md="4" v-for="item in shopList" :key="item.id">
                        <b-card class="mc-db-card">
                            <div class="d-flex justify-content-start align-items-center"  @click="setShop(item.id)">
                                <img :class="mr-3" :src="item.logo" :alt="item.name">
                                <h5>{{ item.name }}</h5>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col xs="12" sm="12" md="8" lg="8" xl="8" offset="2">
                      <b-table-simple class="tg mt-3" bordered hover small caption-top responsive>
                        <thead>
                          <tr>
                            <th scope="col" class="text-center">SL NO</th>
                            <th scope="col" class="text-center">Name</th>
                            <th scope="col" class="text-center">Email</th>
                            <th scope="col" class="text-center">Phone Number</th>
                          </tr>
                        </thead>
                        <tbody v-for="(item, index) in datas" :key="index">
                          <tr>
                            <th scope="row" class="text-center"> {{ index + 1 }}</th>
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.email }}</td>
                            <td class="text-center">{{ item.phone_number }}</td>
                          </tr>
                        </tbody>
                      </b-table-simple>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <Footer></Footer>
  </div>
</template>
<script>
    import RestApi, { apiBaseUrl } from '@/config/api_config'
    import { userList } from '../api/routes'
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: 'Dashboard',
        components: {
            Header,
            Footer
        },
        data () {
            return {
                loader: false
            }
        },
        created () {
            this.loadData()
        },
        computed: {
            currentLocale: function () {
              return this.$i18n.locale
            }
        },
        methods: {
          async loadData () {
            this.loader = true
            const result = await RestApi.getData(apiBaseUrl, userList)
            if (result.success) {
              this.datas = result.data
            } else {
              this.datas = []
            }
            this.loader = false
          }
        }
    }
</script>
