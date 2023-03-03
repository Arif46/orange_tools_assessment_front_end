import Store from '@/store'
import i18n from '@/i18n'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'

const getCommonHierarchyNames = (lowestUnitId, lowestUnitName = 'union', commonObject = Store.getters.commonObj) => {
  const commonObj = commonObject
  let lowestUnit = lowestUnitName.trim().toLowerCase()
  let id = lowestUnitId
  const allNames = {
    divisionName: '',
    districtName: '',
    upazilaName: '',
    unionName: ''
  }

  let item = null
  if (lowestUnit === 'union') {
    item = commonObj.unionList.find(item => item.value === id)

    if (i18n.locale === 'bn') {
      allNames.unionName = (item.text_bn !== undefined) ? item.text_bn : ''
    } else {
      allNames.unionName = (item.text_en !== undefined) ? item.text_en : ''
    }
    id = item.upazilla_id
    lowestUnit = 'upazila'
  }

  if (lowestUnit === 'upazila') {
    item = commonObj.upazilaList.find(item => item.value === id)
    if (i18n.locale === 'bn') {
      allNames.upazilaName = (item.text_bn !== undefined) ? item.text_bn : ''
    } else {
      allNames.upazilaName = (item.text_en !== undefined) ? item.text_en : ''
    }
    id = item.district_id
    lowestUnit = 'district'
  }

  if (lowestUnit === 'district') {
    item = commonObj.districtList.find(item => item.value === id)
    if (i18n.locale === 'bn') {
      allNames.districtName = (item.text_bn !== undefined) ? item.text_bn : ''
    } else {
      allNames.districtName = (item.text_en !== undefined) ? item.text_en : ''
    }
    id = item.division_id
    lowestUnit = 'division'
  }

  if (lowestUnit === 'division') {
    item = commonObj.divisionList.find(item => item.value === id)
    if (i18n.locale === 'bn') {
      allNames.divisionName = (item.text_bn !== undefined) ? item.text_bn : ''
    } else {
      allNames.divisionName = (item.text_en !== undefined) ? item.text_en : ''
    }
  }
  return allNames
}
const setBankAndBranchList = (componentId) => {
  // const commonObj = Store.getters.commonObj
  // // const bankObj = commonObj.bankObj
  // // // if (componentId === bankObj.componentId) {
  // // //   return
  // // // }
  RestApi.getData(commonServiceBaseUrl, `bank-and-branch-by-component-id/${componentId}`, null).then(response => {
    if (response.success === true) {
      const bankList = response.data.bankList.map(item => {
        return Object.assign({}, item, { text: i18n.locale === 'en' ? item.text_en : item.text_bn })
      })
      const branchList = response.data.branchList.map(item => {
        return Object.assign({}, item, { text: i18n.locale === 'en' ? item.text_en : item.text_bn })
      })

      Store.commit('mutateCommonProperties', {
        bankObj: {
          componentId: componentId,
          bankList: bankList,
          branchList: branchList
        }
      })
    }
  })
}
const loggedInUser = () => {
  return this.$store.state.Auth.authUser
}
const OrderCheck = (item, moduleListData, isSave, type) => {
  isSave = true
  moduleListData.map(element => {
    if (type === 'menu1') {
      if (parseInt(element.sorting_order) === parseInt(item.sorting_order) && parseInt(element.value) !== parseInt(item.id) && parseInt(element.service_id) === parseInt(item.service_id)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    } else if (type === 'menu2') {
      if ((parseInt(element.sorting_order) === parseInt(item.sorting_order)) && (parseInt(element.value) !== parseInt(item.id)) && (parseInt(element.module_id) === parseInt(item.module_id)) && (element.service_id == null)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    } else if (type === 'Comp') {
      if (parseInt(element.sorting_order) === parseInt(item.sorting_order) && parseInt(element.value) !== parseInt(item.id)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    } else if (type === 'service') {
      if (parseInt(element.sorting_order) === parseInt(item.sorting_order) && parseInt(element.value) !== parseInt(item.id) && parseInt(element.module_id) === parseInt(item.module_id)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    } else if (type === 'Module') {
      if (parseInt(element.sorting_order) === parseInt(item.sorting_order) && parseInt(element.value) !== parseInt(item.id) && parseInt(element.component_id) === parseInt(item.component_id)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    } else {
      if (parseInt(element.sorting_order) === parseInt(item.sorting_order) && parseInt(element.value) !== parseInt(item.id)) {
        errorMessageShow(item)
        isSave = false
        item.sorting_order = item.old_serial
      }
    }
    return Object.assign({}, element)
  })
  if (isSave) {
    const tmpList = moduleListData.map(element => {
      let sortingOrder = element.sorting_order
      if (parseInt(element.value) === parseInt(item.id)) {
        sortingOrder = item.sorting_order
      }
      return Object.assign({}, element, {
        sorting_order: sortingOrder
      })
    })
    moduleListData = tmpList
  }
  const data = {
    moduleListData: moduleListData,
    isSave: isSave,
    item: item
  }
  return data
}

const errorMessageShow = (item) => {
  window.vm.$swal({
    // title: 'This Sorting Order is allready used',
    title: window.vm.$t('globalTrans.ThisSortingOrderisallreadyused'),
    showCancelButton: false,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    focusConfirm: false
  }).then((resultSwal) => {
  })
}
export default {
  OrderCheck,
  errorMessageShow,
  getCommonHierarchyNames,
  setBankAndBranchList,
  loggedInUser
}
