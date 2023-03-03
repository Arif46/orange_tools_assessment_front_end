import axios from 'axios'
import Store from '../store'
export const apiBaseUrl = 'http://localhost:8000/api/'

// Handling server error
const errorHandler = (error) => {
  if (error.response === undefined) {
    return error
  } else if (error.response.status === 401) {
    Store.dispatch('Auth/updateAuthUser', null)
    Store.commit('mutateCommonProperties', {
      hasDropdownLoaded: false
    })
    window.vm.$toast.error({
      title: 'Error',
      message: 'Unauthorized access.'
    })
    window.vm.$router.push('/auth/login')
  } else if (error.response.status === 500) {
    Store.commit('mutateCommonProperties', {
      loading: false,
      listReload: false
    })
  } else {
    window.vm.$toast.error({
      title: 'Error',
      message: 'Operation failed due to an unknown error.'
    })
  }
  return error
}
export default {
  async execute (baseUrl, method, uri, data, params = {}) {
    const accessToken = Store.state.Auth.accessToken
    const userDetail = localStorage.getItem('userDetail')

    const client = axios.create({
      baseURL: baseUrl,
      json: true
    })

    client.interceptors.response.use(response => response, error => errorHandler(error))
    return client({
      method,
      url: uri,
      data,
      params: params,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : '',
        'user-detail': userDetail ? `${userDetail}` : '',
        'access-menu-name': window.location.href
      }
    }).then(req => {
      return req.data
    })
  },
  getData (baseUrl, uri, params = {}) {
    // const filters = setFilters()
    return this.execute(baseUrl, 'get', uri, {}, params)
  },
  postData (baseUrl, uri, data) {
    return this.execute(baseUrl, 'post', uri, data)
  },
  putData (baseUrl, uri, data) {
    return this.execute(baseUrl, 'put', uri, data)
  },
  deleteData (baseUrl, uri) {
    return this.execute(baseUrl, 'delete', uri)
  }
}
