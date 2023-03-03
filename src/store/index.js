import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Custom from './custom'
import Setting from './Setting/index'
import Auth from '../modules/auth-service/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Setting,
    Auth
  },
  state: {
    list: [],
    notificationList: [],
    totalNotification: 0,
    isPushNotification: [],
    toggleNotification: false,
    commonObj: {
      hasDropdownLoaded: false,
      perPage: 10,
      limit: 10,
      dateFormat: 'DD/MM/YYYY',
      fiscaleYear: 'YYYY-YYYY',
      timeFormat: 'h:m',
      unitOfTime: 'day',
      loading: false,
      listReload: false,
      maritalStatus: Custom.maritalStatus,
      genderList: Custom.genderList,
      activeIntactive: Custom.activeIntactive,
      pageOptions: Custom.pageOptions,
      typeList: Custom.cityTypeList,
      gradeList: Custom.gradeList,
      noticeForList: Custom.noticeForList,
      areaTypeList: Custom.areaTypeList,
      monthList: Custom.monthList,
      statusList: Custom.statusList,
      priceVariationList: Custom.priceVariationList,
      fifteenDayList: Custom.fifteenDayList,
      banglaMonthDays: Custom.banglaMonthDays,
      banglaMonthList: Custom.banglaMonthList,
      yearList: Custom.yearList,
      weekList: Custom.weekList
    },
    orgList: [],
    orgComponentList: []
  },
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
})
