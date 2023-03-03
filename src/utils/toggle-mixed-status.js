import Store from '@/store'
import RestApi from '@/config/api_config'

const mixedStatus = (baseUrl, uri, item, hideModal) => {
  Store.dispatch('isToggleNotification', false)
  Store.dispatch('mutateCommonProperties', { loading: true, listReload: false })
  RestApi.getData(baseUrl, uri, item).then(response => {
    if (response.success) {
      if (response.notification) {
        Store.dispatch('isToggleNotification', response.notification)
      }
      window.vm.$toast.success({
        title: window.vm.$t('globalTrans.success'),
        message: window.vm.$t('globalTrans.update_msg'),
        color: '#D6E09B'
      })
      if (hideModal) {
        if (hideModal !== null || hideModal.length > 0) {
          hideModal.forEach(modal => {
            window.vm.$bvModal.hide(modal)
          })
        }
      }
    } else {
        window.vm.$toast.error({
          title: window.vm.$t('globalTrans.error'),
          message: window.vm.$t('globalTrans.operationFailed')
      })
    }
    Store.dispatch('mutateCommonProperties', { loading: false, listReload: true })
  })
}

const toggleMixedStatus = (baseUrl, uri, item, swalMsg = null, hideModal = null) => {
    // const msg = swalMsg
    window.vm.$swal({
        title: swalMsg || window.vm.$t('globalTrans.statusChangeMsg'),
        showCancelButton: true,
        confirmButtonText: window.vm.$t('globalTrans.yes'),
        cancelButtonText: window.vm.$t('globalTrans.no'),
        focusConfirm: false
    }).then((result) => {
        if (result.isConfirmed) {
            mixedStatus(baseUrl, uri, item, hideModal)
        }
    })
}

export default toggleMixedStatus
