import Vue from 'vue'
import moment from 'moment'
import i18n from '../i18n'
import Store from '../store/index'

function formatNumber (value) {
  return Number(value).toLocaleString()
}
const formatForDate = Store.getters.commonObj.dateFormat

function dateFormat (value, format = formatForDate) {
    require('moment/min/locales.min')
    moment.locale(i18n.locale)
    return moment(value).format(format)
}

function dateFromNow (value, unitOfTime = Store.getters.commonObj.unitOfTime) {
    require('moment/min/locales.min')
    moment.locale(i18n.locale)
    return moment(value).startOf(unitOfTime).fromNow()
}

function dateFormatTime (value) {
    require('moment/min/locales.min')
    moment.locale(i18n.locale)
    const commonObj = Store.getters.commonObj
    return moment(value).format(commonObj.dateFormat + ' h:mm:ss a')
}

function time12Formate (time) {
    require('moment/min/locales.min')
    moment.locale(i18n.locale)
    return moment(time, ['HH.mm']).format('hh:mm a')
    // const timeIndex1st = time.split(':')[0]
    // const timeIndex3rd = time.split(':')[1]
    // if (timeIndex1st >= 12) {
    //     return (timeIndex1st - 12) + ':' + timeIndex3rd + ' PM'
    // } else {
    //     return timeIndex1st + ':' + timeIndex3rd + ' AM'
    // }
}

function time12FormateTraining (time) {
    return moment(time, ['HH.mm']).format('hh:mm')
    // const timeIndex1st = time.split(':')[0]
    // const timeIndex3rd = time.split(':')[1]
    // if (timeIndex1st >= 12) {
    //     return (timeIndex1st - 12) + ':' + timeIndex3rd + ' PM'
    // } else {
    //     return timeIndex1st + ':' + timeIndex3rd + ' AM'
    // }
}

function numberFormatBn (value, $this, config = { }) {
    try {
        if (typeof value !== 'undefined' && value) {
            const firstChar = value.substring(0, 1)
            const hasZero = parseInt(firstChar) === 0
            return hasZero ? (i18n.locale === 'bn' ? '০' + $this.$n(value, config) : '0' + $this.$n(value, config))
                : $this.$n(value, config)
        }
    } catch (e) {
        return value
    }
}

function mobileNumber (value) {
    try {
        if (typeof value !== 'undefined' && value) {
           if (i18n.locale === 'bn') {
               return '০' + i18n.n(value, { useGrouping: false })
           } else {
            return '0' + i18n.n(value, { useGrouping: false })
        }
        }
    } catch (e) {
        return value
    }
}

function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function kebabToWords (string) {
    const words = string.split('-')
    const capitalized = words.map(word => capitalize(word))
    return capitalized.join(' ')
}

function snakeToWords (string) {
    const words = string.split('_')
    const capitalized = words.map(word => capitalize(word))
    return capitalized.join(' ')
}
function wordsToSnake (str) {
    if (typeof str !== 'undefined' && typeof str === 'string') {
        const words = str.split(' ')
        return words.join('_').toLowerCase()
    }
}

function getRegexString (str) {
    if (typeof str !== 'undefined' && typeof str === 'string') {
        const newStr = str.replace(/[^a-zA-Z_ ]/g, '')
        return newStr
    }
}

function getExtension (file) {
    const fileName = file.name
    return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2)
}
function randomNumber () {
    return Math.floor(Math.random() * 10000000)
}

function currency ($event, model) {
    const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
    // only allow number and one dot
    if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || model.indexOf('.') !== -1)) { // 46 is dot
        $event.preventDefault()
    }
    // restrict to 2 decimal places
    if (model != null && model.indexOf('.') > -1 && (model.split('.')[1].length > 1)) {
        $event.preventDefault()
    }
}

function shortString (str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str
}
function hasValue (value) {
    return value != null
}
function isNotEmpty (value) {
    return hasValue(value) && (value.toString() !== '')
}

// Vue.filter ('myDate', function (text) {
//   return moment(text).format('MMMM Do YYYY')
// })

Vue.filter('regexString', function (value) {
    return getRegexString(value)
})

Vue.filter('reverse', function (value) {
    // slice to make a copy of array, then reverse the copy
    return value.slice().reverse()
})

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).fromNow()
    }
})

Vue.filter('time12Formate', function (time) {
    return moment(time, ['HH.mm']).format('hh:mm a')
    // const timeIndex1st = time.split(':')[0]
    // const timeIndex3rd = time.split(':')[1]
    // if (timeIndex1st >= 12) {
    //     return (timeIndex1st - 12) + ':' + timeIndex3rd + ' PM'
    // } else {
    //     return timeIndex1st + ':' + timeIndex3rd + ' AM'
    // }
})

Vue.filter('time12FormateTraining', function (time) {
    return moment(time, ['HH.mm']).format('hh:mm')
    // const timeIndex1st = time.split(':')[0]
    // const timeIndex3rd = time.split(':')[1]
    // if (timeIndex1st >= 12) {
    //     return (timeIndex1st - 12) + ':' + timeIndex3rd + ' PM'
    // } else {
    //     return timeIndex1st + ':' + timeIndex3rd + ' AM'
    // }
})

Vue.filter('dateFromNow', function (value) {
    if (value) {
        return dateFromNow(String(value))
    }
})

Vue.filter('formatDateDMY', function (value) {
    if (value) {
        return moment(value).format('DD-MM-YYYY')
    }
})

Vue.filter('timeFormat', function (value) {
    if (value) {
        return moment.parseZone(value).utcOffset()
    }
})

Vue.filter('dateFormat', function (value) {
  return dateFormat(value)
})

Vue.filter('dateFormatTime', function (value) {
    require('moment/min/locales.min')
    moment.locale(i18n.locale)
    const commonObj = Store.getters.commonObj
    return moment(value).format(commonObj.dateFormat + ' h:mm:ss a')
})

Vue.filter('kebabToWords', (value) => {
    if (typeof value !== 'undefined') {
        return kebabToWords(value)
    }
})

Vue.filter('snakeToWords', (value) => {
    if (typeof value !== 'undefined') {
        return snakeToWords(value)
    }
})

Vue.filter('wordsToSnake', (value) => {
    if (typeof value !== 'undefined') {
        return wordsToSnake(value)
    }
})

Vue.filter('numberFormatBn', (value, config = { }) => {
    return numberFormatBn(value, config)
})

Vue.filter('shortString', (value, length) => {
    return shortString(value, length)
})

Vue.filter('mobileNumber', (value) => {
    return mobileNumber(value)
})

Vue.filter('isNotEmpty', (value) => {
    if (typeof value !== 'undefined') {
        return isNotEmpty(value)
    }
})

export { capitalize, formatNumber, dateFormat, dateFormatTime, mobileNumber, numberFormatBn, kebabToWords, snakeToWords, wordsToSnake, getExtension, randomNumber, currency, dateFromNow, time12Formate, time12FormateTraining, shortString, getRegexString, isNotEmpty }
