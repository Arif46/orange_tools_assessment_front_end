import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

// Toastr config
const toastrConfigs = {
  position: 'top right',
  errorColor: '#D6E09B',
  warningColor: '#218838',
  showDuration: 1000,
  timeOut: 3000
}

Vue.use(CxltToastr, toastrConfigs)
