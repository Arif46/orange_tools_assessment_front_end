import RestApi from '@/config/api_config'
import store from '@/store'
import i18n from '@/i18n'

export const Common = {
    computed: {
        loading () {
            return this.$store.state.commonObj.loading
        },
        listReload () {
            return this.$store.state.commonObj.listReload
        },
        loadingState () {
            if (this.listReload || this.loading) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        startLoading () {
            store.dispatch('mutateCommonProperties', { loading: true })
        },
        finishLoading () {
            store.dispatch('mutateCommonProperties', { loading: false, listReload: false })
        },
        showMessage (result, modalId = false, modalClose = true) {
            if (result.success) {
                window.vm.$toast.success({
                    title: 'Success',
                    message: window.vm.id ? 'Data updated successfully' : 'Data saved successfully',
                    color: '#D6E09B'
                })
                if (modalClose) {
                    window.vm.$emit('hide-modal')
                    window.vm.$bvModal.hide(modalId || 'modal-4')
                }
            } else {
                window.vm.$refs.form.setErrors(result.errors)
            }
        }
    }
}
export const List = {
    watch: {
        loadingState: function (newVal, oldVal) {
            if (newVal) {
                this.loadData()
            }
        }
    },
    data () {
        return {
            pagination: {
                currentPage: 1,
                totalRows: 0,
                perPage: this.$store.state.commonObj.perPage,
                slOffset: 1
            }
        }
    },
    methods: {
        mixinToggleStatus (baseURL, API, dispatch, payload) {
            RestApi.deleteData(baseURL, API).then(response => {
                helpers.successErrorToaster(response, () => {
                    this.$store.dispatch(dispatch, payload)
                })
            })
        },
        edit (item) {
            this.testId = item.id
        },
        remove (item) {
            this.$swal({
                title: this.$t('globalTrans.statusChangeMsg'),
                showCancelButton: true,
                confirmButtonText: this.$t('globalTrans.yes'),
                cancelButtonText: this.$t('globalTrans.no'),
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                    this.toggleStatus(item)
                }
            })
        },
        paginationData (data) {
            this.pagination.currentPage = data.current_page
            this.pagination.perPage = data.per_page
            this.pagination.totalRows = data.total
            this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
        },
        /**
         *
         * For customData param:
         * Formatted object to fit in helper-function follow the following format to load data
         * const customData = {}
         */
        async mixinLoadData (baseURL, listAPI, dispatch, customData = {}) {
            let data = []
            let paginationData = []
            if (Object.keys(customData).length !== 0) {
                data = customData
                paginationData = customData
            } else {
                const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
                const response = await RestApi.getData(baseURL, listAPI, params)
                if (response.success) {
                    data = response.data.data
                    paginationData = response.data
                }
            }
            this.$store.dispatch(dispatch, data)
            this.paginationData(paginationData)
            this.$store.dispatch('mutateCommonProperties', { loading: false, listReload: false })

            return Object.assign(data, paginationData)
        }
    }
}
export const helpers = {
    removeFromObject (object, items = []) {
        /* eslint-disable no-unused-vars */
        for (const [key, value] of Object.entries(object)) {
            delete object[items.find(element => element === key)]
        }
        return object
        /* eslint-enable no-unused-vars */
    },
    successErrorToaster (response, onSuccess = false, msg = null, errorMsg = null) {
        if (response.success) {
            window.vm.$toast.success({
                title: 'Success',
                message: msg || 'Data Updated Successfully!',
                color: '#D6E09B'
            })
            if (onSuccess) {
                onSuccess()
            }
        } else {
            window.vm.$toast.error({
                title: 'Error',
                message: errorMsg || 'Operation failed! Please, try again.'
            })
        }
    },
    stringLimit (text, count) {
        return text ? text.slice(0, count) + (text.length > count ? '...' : '') : ''
    },
    /*
     * Data List to view Data
     * Param: Object
     * Expected Object pattern:
     * <b-table> -> row-selected Event returned object
     */
    makeDataList (dataObject) {
        let dataString = ''
        const bnData = {}
        const commonData = {}
        return new Promise((resolve) => {
            setTimeout(() => {
                if (typeof dataObject === 'object') {
                    for (let [key, value] of Object.entries(dataObject)) {
                        let bnExists = key.search('_bn') > -1
                        if (typeof value === 'string') {
                            const linkExists = value.search('http') > -1
                            if (linkExists) {
                                value = `<a href="${value}" target="_blank">Go To Link</a>`
                            }
                        }
                        if (!bnExists) {
                            commonData[key] = value
                        }
                        if (i18n.locale === 'bn' && bnExists) {
                            bnData[key.split('_bn').join('')] = value
                        }
                        bnExists = -1
                    }
                    const data = Object.assign(commonData, bnData)
                    for (const [key, value] of Object.entries(data)) {
                        let newKey = key.split('_').join(' ')
                        newKey = newKey.charAt(0).toUpperCase() + newKey.slice(1)
                        dataString += ` <dt class="col-sm-4">${newKey}</dt><dd class="col-sm-8">${value}</dd>`
                    }
                    const template = `<dl class="row" style="color: #666;">${dataString}</dl>`
                    resolve(template)
                }
            }, 500)
        })
    },
    findEnBn (items, id, id_name = 'id', text_en = 'name', text_bn = 'name_bn') {
        const foundItem = items.find(el => el[id_name] === id)
        let name = foundItem[text_en] || foundItem.name_en || foundItem.text_en
        if (i18n.locale === 'bn') {
            name = status[text_bn] || foundItem.text_bn
        }
        return name
    },
    filterObjectByArrayItem (object, dataArray) {
        const container = {}
        Object.keys(object).map((key, index) => {
            const found = dataArray.find(e => e === key)
            if (typeof found !== 'undefined' && found !== null) {
                container[found] = object[found]
            }
        })

        return container
    },
    getProperty (propertyName, object) {
        const parts = propertyName.split('.')
        const length = parts.length
        let i
        let property = object || this
        for (i = 0; i < length; i++) {
            property = property[parts[i]]
        }
        return property
    },
    convertEnglishToBanglaNumber (str = '') {
        const englishNumber = {
            0: '০',
            1: '১',
            2: '২',
            3: '৩',
            4: '৪',
            5: '৫',
            6: '৬',
            7: '৭',
            8: '৮',
            9: '৯'
        }
        if (str !== '' && window.vm.$i18n.locale === 'bn') {
            for (var x in englishNumber) {
                str = str.toString().replace(new RegExp(x, 'g'), englishNumber[x])
            }
            return str
        } else {
            return str
        }
    },
    getYearList (config = {}) {
        /* eslint-disable */
        const currentYear = new Date().getFullYear()
        const yearSpan = config.yearSpan || 10       // config.yearSpan for custom yearSapn on function Call
        var years = []
        for (let i = parseInt(currentYear); i >= parseInt((currentYear - yearSpan)); i--) {
            if(window.vm.$i18n.locale === 'bn') {
                const convertEnglishToBanglaNumber=(str)=>{
                    let englishNumber= {
                        '0' : '০',
                        '1' : '১',
                        '2' : '২',
                        '3' : '৩',
                        '4' : '৪',
                        '5' : '৫',
                        '6' : '৬',
                        '7' : '৭',
                        '8' : '৮',
                        '9' : '৯'
                    }
                    for (var x in englishNumber) {
                        str = str.toString().replace(new RegExp(x, 'g'), englishNumber[x]);
                    }
                    return str;
                }
                years.push({ value: i, text: convertEnglishToBanglaNumber(i.toString()) })
            } else {
                years.push({ value: i, text: i })
            }
        }
        return years
        /* eslint-enable */
    },
    calculateAge (dateString) {
        var today = new Date()
        var birthDate = new Date(dateString)
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    },
    filterListLang (list = [], en = 'text', bn = 'text_bn', value = 'value') {
        return list.map(el => {
            return window.vm.$i18n.locale === 'en' ? {
                text: el[en],
                value: el[value]
            } : {
                text: el[bn],
                value: el[value]
            }
        })
    },
    swalInit (msg = null) {
        return window.vm.$swal({
            title: msg || window.vm.$t('globalTrans.statusChangeMsg'),
            showCancelButton: true,
            confirmButtonText: window.vm.$t('globalTrans.yes'),
            cancelButtonText: window.vm.$t('globalTrans.no'),
            focusConfirm: false
        })
    },
    // capitalize only the first letter of the string.
    capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },
    // capitalize all words of a string.
    capitalizeWords (string) {
        return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    },
    // current date
    currentDate () {
        return new Date().toISOString().substr(0, 10)
    }
}
/**
 *  data = {
 *    data: Object,
 *    baseURL: String,
 *    storeAPI: String,
 *    updateAPI: String,
 *    itemId: String,
 *    modalId: String|NULL|False,
 *    modalClose: True|False,
 *    showMessage: True|False,
 *    onSuccessDispatch: {
 *        path: String,
 *        payload: Object
 *    }
 *    async onSuccess() : function
 *  }
 */
export const Repository = {
    async create (data = {}) {
        await store.dispatch('mutateCommonProperties', { loading: true })
        let result = null
        let storeOrUpdateApi = null
        const loadingState = { loading: false, listReload: true }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        var formData = new FormData()
        Object.keys(data.data).map(key => {
            formData.append(key, data.data[key])
        })
        storeOrUpdateApi = data.itemId ? `${data.updateAPI}/${data.itemId}` : data.storeAPI
        if (data.itemId) {
            formData.append('_method', 'PUT')
        }

        result = await RestApi.postData(data.baseURL, storeOrUpdateApi, formData, config)
        loadingState.listReload = true
        if (!result.success) {
            window.vm.$toast.error({
                title: 'Error',
                message: result.message
            })
        } else {
            if (typeof window.vm !== 'undefined' && window.vm) {
                const showMessage = typeof data.showMessage !== 'undefined' ? data.showMessage : true
                if (showMessage) {
                    Common.methods.showMessage(result, data.modalId || false, data.modalClose || true)
                }
            }
        }
        if (data.onSuccessDispatch) {
            if (result.success && data.itemId) {
                await store.dispatch(data.onSuccessDispatch.path, data.onSuccessDispatch.payload)
            } else if (result.success && !data.data.id) {
                loadingState.listReload = true
            }
        }

        if (data.onSuccess) {
            if (result.success && data.itemId) {
                await data.onSuccess()
            } else {
                await data.onSuccess(false)
            }
        }
        // loadingState = { loading: false, listReload: false }
        await store.dispatch('mutateCommonProperties', loadingState)
        return result
    }
}

/*
*
* Address Method Mixin
* Requirements:
* Data:
*  statePrefix: String (Location of the store object that contains veux properties) | Specific | Required
*  districtList: Array | Usable
*  upazilaList: Array | Usable
*  unionList: Array | Usable
*  addressParentLocation: Object >
*  { division: Select Value | path: Data Object,
*   district: Select Value | path: Data Object,
*   upazila: Select Value | path: Data Object } | Required
*   divisionList: Array | Location: Store State
*/
export const Address = {
    data () {
        return {
            statePrefix: null,
            districtList: [],
            upazilaList: [],
            unionList: []
        }
    },
    computed: {
        divisionList () {
            return helpers.getProperty(this.statePrefix, this.$store.state).divisionList
        }
    },
    methods: {
        getDivision (id) {
            if (id === null || id === undefined) {
                return ''
            }
            const list = helpers.getProperty(this.statePrefix, this.$store.state).divisionList
            const tmp = list.find(item => item.value === id)
            return (this.$i18n.locale === 'bn') ? tmp.text_bn : tmp.text_en
        },
        getDistrict (id) {
            if (id === null || id === undefined) {
                return ''
            }
            const list = this.getDistrictList()
            const tmp = list.find(item => item.value === id)
            return (this.$i18n.locale === 'bn') ? tmp.text_bn : tmp.text_en
        },
        getUpazila (id) {
            if (id === null || id === undefined) {
                return ''
            }
            const list = this.getUpazilaList()
            const tmp = list.find(district => district.value === id)
            return (this.$i18n.locale === 'bn') ? tmp.text_bn : tmp.text_en
        },
        getUnion (id) {
            if (id === null || id === undefined) {
                return ''
            }
            const list = this.getUnionList()
            const tmp = list.find(district => district.value === id)
            return (this.$i18n.locale === 'bn') ? tmp.text_bn : tmp.text_en
        },
        getDistrictList (id = null) {
            this.upazilaList = []
            this.unionList = []
            let list = []
            list = helpers.getProperty(this.statePrefix, this.$store.state).districtList
            if (id) {
                list = list.filter(item => item.division_id === id)
            }
            return list
        },
        getUpazilaList (id = null) {
            this.unionList = []
            let list = []
            list = helpers.getProperty(this.statePrefix, this.$store.state).upazilaList
            if (id) {
                list = list.filter(item => item.district_id === id)
            }
            return list
        },
        getUnionList (id = null) {
            let list = []
            list = helpers.getProperty(this.statePrefix, this.$store.state).unionList
            if (id) {
                list = list.filter(item => item.upazilla_id === id)
            }
            return list
        }
    }
}
