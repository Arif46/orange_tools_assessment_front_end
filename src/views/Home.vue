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
          <b-col sm="12" md="4">
            <b-card class="mc-db-card">
              <div class="d-flex justify-content-start align-items-center">
                <img class="mr-2 g2b" src="../assets/icons/main-dashboard/g2b-portal.png" alt="">
                <h5>National G2B Portal</h5>
              </div>
            </b-card>
          </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card" @click="goToComp()">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 bms" src="../assets/icons/main-dashboard/bazar-monitoring.png" alt="">
                    <h5>Bazar Monitoring System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 ebiz" src="../assets/icons/main-dashboard/e-biz.png" alt="">
                    <h5>E-Biz Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 tgm" src="../assets/icons/main-dashboard/tea.png" alt="">
                    <h5>Tea Garden Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 bfti" src="../assets/icons/main-dashboard/bfti_policy.png" alt="">
                    <h5>BFTI Research & Policy Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 olr" src="../assets/icons/main-dashboard/license.png" alt="">
                    <h5>Online License, Registratio, Permission, Certification & Clearance Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 ttms" src="../assets/icons/main-dashboard/trade.png" alt="">
                    <h5>Trade & Tariff Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 itf" src="../assets/icons/main-dashboard/shop.png" alt="">
                    <h5>International Trade Fair Participation Exploration</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 cip" src="../assets/icons/main-dashboard/trophy.png" alt="">
                    <h5>Export Trophy & CIP Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 rjsc" src="../assets/icons/main-dashboard/rjsc.png" alt="">
                    <h5>RJSC Registered Entity Portal & Digital Service Management System</h5>
                  </div>
                </b-card>
            </b-col>
            <b-col sm="12" md="4">
                <b-card class="mc-db-card">
                  <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-2 csc" src="../assets/icons/main-dashboard/commons-service.png" alt="">
                    <h5>Common Service Configuration</h5>
                  </div>
                </b-card>
            </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  methods: {
    goToComp () {
      this.$router.push('/designer-service/configuration/template-one')
    }
  }
}
</script>
