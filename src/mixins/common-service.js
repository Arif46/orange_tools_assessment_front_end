import RestApi, { commonServiceBaseUrl } from '@/config/api_config'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      mixinComponentId: 0
    }
  },
  computed: {
    // hasDropdownLoadedCommonService () {
    //   return this.$store.state.CommonService.commonObj.hasDropdownLoaded
    // },
    ...mapGetters({
      commonObj: 'CommonService/commonObj',
      authUser: 'Auth/authUser',
      activeRoleId: 'Auth/getActiveRole'
    })
  },
  watch: {
    // hasDropdownLoadedCommonService: function (newValue) {
    //   if (!newValue) {
    //     // this.loadCommonServiceDropdown()
    //   }
    // }
  },
  created () {
    const hasDropdownLoadedCommonService = this.$store.state.CommonService.commonObj.hasDropdownLoaded
    if (!hasDropdownLoadedCommonService || window.performance) {
      // this.loadCommonServiceDropdown()
      this.setOrgDesignationList()
    }
  },
  methods: {
    setOrgDesignationList () {
      if (!this.mixinComponentId) {
        return
      }
      RestApi.getData(commonServiceBaseUrl, `organogram/component-designaiton/comp-designations/${this.mixinComponentId}`)
      .then(response => {
        if (response.success) {
          let newDesignationList = []
          const desigList = response.data
          if (desigList.length > 0) {
            const orgDesigList = desigList.map(item => {
              const desigObj = this.commonObj.designationList.find(desig => desig.value === item.designation_id)
              return Object.assign({}, desigObj, { text: this.$i18n.locale === 'en' ? desigObj.text_en : desigObj.text_bn })
            })
            newDesignationList = this.getDesignationByUserType(orgDesigList)
          }
          this.$store.commit('CommonService/mutateCommonObj', { componentDesignationList: newDesignationList })
        }
      })
    },
    mixinSetComponentOrgList () {
      const orgComponents = this.getOrgAdminData()
      const orgCompList = orgComponents.map(item => {
        const orgObj = this.commonObj.orgProfileList.find(org => org.value === item.org_id)
        return Object.assign({}, orgObj, { text: this.$i18n.locale === 'en' ? orgObj.text_en : orgObj.text_bn })
      })

      this.$store.commit('CommonService/mutateCommonObj', { componentOrgList: this.getOrgByUserType(orgCompList) })
    },
    // loadCommonServiceDropdown () {
    //   RestApi.getData(commonServiceBaseUrl, 'common-dropdowns', null).then(response => {
    //     if (response.success) {
    //       this.$store.dispatch('CommonService/mutateCommonObj', {
    //         hasDropdownLoaded: true,
    //         committeeList: response.data.committeeList,
    //         agendaList: response.data.agendaList,
    //         componentList: response.data.componentList,
    //         orgComponentList: response.data.orgComponentList,
    //         divisionList: response.data.divisionList,
    //         districtList: response.data.districtList,
    //         upazilaList: response.data.upazilaList,
    //         moduleList: response.data.moduleList,
    //         serviceList: response.data.serviceList,
    //         unionList: response.data.unionList,
    //         cityCorporationList: response.data.cityCorporationList,
    //         municipalityList: response.data.municipalityList,
    //         orgProfileList: response.data.orgProfileList,
    //         fiscalYearList: this.fiscalYearBnAdd(response.data.fiscalYearList),
    //         wardList: response.data.wardList,
    //         dialogueInfosList: response.data.dialogueInfosList,
    //         designationList: response.data.designationList,
    //         assignDesignationList: response.data.assignDesignationList,
    //         bankList: response.data.bankList,
    //         officeTypeList: response.data.officeTypeList,
    //         menuList: response.data.menuList,
    //         notificationTypeList: response.data.notificationTypeList,
    //         notificationTemplateList: response.data.notificationTemplateList,
    //         officeList: response.data.officeList,
    //         documentCategoryList: response.data.documentCategoryList,
    //         ministryNameList: response.data.ministryNameList,
    //         portalServiceCategoryList: response.data.portalServiceCategoryList,
    //         portalCustomerTypeList: response.data.portalCustomerTypeList,
    //         exOrgList: response.data.exOrgList,
    //         externalPanelList: response.data.externalPanelList,
    //         externalMenuList: response.data.externalMenuList,
    //         countryList: response.data.countryList
    //       })
    //       this.$store.dispatch('CommonService/localizeDropdown', { value: this.$i18n.locale })
    //       this.mixinSetComponentOrgList()
    //     }
    //   })
    // },
    fiscalYearBnAdd (data) {
      const bnList = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      const bnAdded = data.map(item => {
        const fiscalYearData = {}
        const result = item.text_bn.split('').map(item => item === '-' ? '-' : bnList[item])
        fiscalYearData.text_bn = result.join('')
        return Object.assign({}, item, fiscalYearData)
      })
      return bnAdded
    },
    getOrgAdminData () {
      // if (this.authUser.org_admin) {
      //   return this.commonObj.orgComponentList.filter(item => (item.component_id === this.mixinComponentId) && (item.org_id === this.authUser.org_id))
      // }
      return this.commonObj.orgComponentList.filter(item => item.component_id === this.mixinComponentId)
    },
    getOrgByUserType (orgProfileList) {
      return orgProfileList
      // if (this.activeRoleId === 1) {
      //   return orgProfileList
      // }
      // else {
      //   return orgProfileList.filter(item => item.value === parseInt(this.authUser.org_id))
      // }
    },
    getDesignationByUserType (designationList) {
      return designationList
      // if (this.activeRoleId === 1) {
      //   return designationList
      // }
      // else {
      //   return designationList.filter(item => item.org_id === parseInt(this.authUser.org_id))
      // }
    }
  }
}
