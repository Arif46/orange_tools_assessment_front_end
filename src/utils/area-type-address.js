import Store from '@/store'
import i18n from '@/i18n'

function getWardName (Id) {
  const Obj = Store.state.CommonService.commonObj.wardList.find(item => item.value === parseInt(Id))
  if (Obj) {
      return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getUnionName (Id) {
  const Obj = Store.state.CommonService.commonObj.unionList.find(item => item.value === parseInt(Id))
  if (Obj) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getPauroshobaName (Id) {
  const Obj = Store.state.CommonService.commonObj.municipalityList.find(item => item.value === parseInt(Id))
  if (Obj !== undefined) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getCityCorporationName (Id) {
  const Obj = Store.state.CommonService.commonObj.cityCorporationList.find(item => item.value === parseInt(Id))
  if (Obj) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getUpazilaName (Id) {
  const Obj = Store.state.CommonService.commonObj.upazilaList.find(item => item.value === parseInt(Id))
  if (Obj) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getDistrictName (Id) {
  const Obj = Store.state.CommonService.commonObj.districtList.find(item => item.value === parseInt(Id))
  if (Obj) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getDivisionName (Id) {
  const Obj = Store.state.CommonService.commonObj.divisionList.find(item => item.value === parseInt(Id))
  if (Obj) {
    return i18n.locale === 'bn' ? Obj.text_bn : Obj.text_en
  } else {
    return ''
  }
}

function getPresentAddress (data) {
  let address = ''
  if (data.pr_village_bn) {
    address = (i18n.locale === 'en' ? data.pr_village_en : data.pr_village_bn) + ', '
  }

  if (data.pr_ward_id) {
    address = address + getWardName(data.pr_ward_id) + ', '
  }
  if (data.pr_union_id) {
    address = address + getUnionName(data.pr_union_id) + ', '
  }
  if (data.pr_city_corporation_id) {
    address = address + getCityCorporationName(data.pr_city_corporation_id) + ', '
  }
  if (data.pr_pauroshoba_id) {
    address = address + getPauroshobaName(data.pr_pauroshoba_id) + ', '
  }
  if (data.pr_paurashava_id) {
    address = address + getPauroshobaName(data.pr_paurashava_id) + ', '
  }
  if (data.pr_upazila_id) {
    address = address + getUpazilaName(data.pr_upazila_id) + ', '
  }
  if (data.pr_district_id) {
    address = address + getDistrictName(data.pr_district_id) + ', '
  }
  if (data.pr_division_id) {
    address = address + getDivisionName(data.pr_division_id)
  }
  return address
}

function getPermanentAddress (data) {
  let address = ''
  if (data.pm_village_bn || data.pm_village_en) {
    address = (i18n.locale === 'en' ? data.pm_village_en : data.pm_village_bn) + ', '
  }
  if (data.pm_ward_id) {
    address = address + getWardName(data.pm_ward_id) + ', '
  }
  if (data.pm_union_id) {
    address = address + getUnionName(data.pm_union_id) + ', '
  }
  if (data.pm_city_corporation_id) {
    address = address + getCityCorporationName(data.pm_city_corporation_id) + ', '
  }
  if (data.pm_pauroshoba_id) {
    address = address + getPauroshobaName(data.pm_pauroshoba_id) + ', '
  }
  if (data.pr_paurashava_id) {
    address = address + getPauroshobaName(data.pr_paurashava_id) + ', '
  }
  if (data.pm_upazila_id) {
    address = address + getUpazilaName(data.pm_upazila_id) + ', '
  }
  if (data.pm_district_id) {
    address = address + getDistrictName(data.pm_district_id) + ', '
  }
  if (data.pm_division_id) {
    address = address + getDivisionName(data.pm_division_id)
  }
  return address
}

function getCommonAddress (data) {
  let address = []

  if (data.village_bn || data.village_en) {
    address = (i18n.locale === 'en' ? data.village_en : data.village_bn) + ', '
  }
  if (data.ward_id) {
    address = address + getWardName(data.ward_id) + ', '
  }
  if (data.union_id) {
    address = address + getUnionName(data.union_id) + ', '
  }
  if (data.city_corporation_id) {
    address = address + getCityCorporationName(data.city_corporation_id) + ', '
  }
  if (data.paurashava_id) {
    address = address + getPauroshobaName(data.paurashava_id) + ', '
  }
  if (data.upazila_id) {
    address = address + getUpazilaName(data.upazila_id) + ', '
  }
  if (data.district_id) {
    address = address + getDistrictName(data.district_id) + ', '
  }
  if (data.division_id) {
    address = address + getDivisionName(data.division_id)
  }
  return address
}

export default {
  getDivisionName,
  getDistrictName,
  getUpazilaName,
  getPauroshobaName,
  getUnionName,
  getWardName,
  getCityCorporationName,
  getPresentAddress,
  getPermanentAddress,
  getCommonAddress
}
