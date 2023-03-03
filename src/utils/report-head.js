import i18n from '@/i18n'
import RestApi from '@/config/api_config'
import Store from '@/store'

const getReportHead = async (baseUrl, uri, orgId, reportTitle = 'Report') => {
  const reportHeadColumn = [{ width: '*', text: '' }]
  const result = await RestApi.getData(baseUrl, `${uri}/${orgId}`)
  //
  if (!result.success) {
    return reportHeadColumn
  }
  //
  const orgList = Store.state.CommonService.commonObj.orgProfileList
  // const orgList = Store.state.commonObj.organizationProfileList
  const orgData = orgList.find(item => item.value === orgId)
  const orgName = i18n.locale === 'en' ? orgData?.text_en : orgData?.text_bn
  const govInfo = i18n.locale === 'en' ? "Government of the People's Republic of Bangladesh" : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
  const address = i18n.locale === 'en' ? result.data.address : result.data.address_bn
  let projectName = ''

  if (Object.prototype.hasOwnProperty.call(result.data, 'project_name')) {
    projectName = i18n.locale === 'en' ? result.data.project_name : result.data.project_name_bn
  }

  if (result.data.left_logo) {
    reportHeadColumn.push({
      width: 40,
      height: 40,
      image: 'data:image/png;base64,' + result.data.left_logo
    })
  }
  const headMargin = i18n.locale === 'en' ? [10, -7, 10, 10] : [33, -9, 13, 10]

  reportHeadColumn.push({
    width: 'auto',
    text: govInfo,
    margin: headMargin,
    style: ['header']
  })

  if (result.data.right_logo) {
    reportHeadColumn.push({
      width: 40,
      height: 40,
      image: 'data:image/png;base64,' + result.data.right_logo
    })
  }
  reportHeadColumn.push({
    width: '*',
    text: ''
  })
  //
  return { address, reportHeadColumn, projectName, orgName }
}

export default {
  getReportHead
}
