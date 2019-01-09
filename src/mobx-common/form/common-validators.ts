import isFunction from 'lodash/isFunction'
import { FormItemValidateFn } from './formItem'
import UrlParse from 'url-parse'
// import { get } from '../../store/fetch'

export function all(validateFns: FormItemValidateFn<any>[]) {
  return (value) => {
    return Promise.all(validateFns.map(validateFn => validateFn(value)))
    // let promise = Promise.resolve()
    // validateFns.forEach((validateFn) => {
    //   promise = promise.then(validateFn(value))
    // })
    // return promise
  }
}

export function required(key = ''): FormItemValidateFn<any> {
  return (value) => {
    if (value == void 0 || value === '') throw new Error(`${key}不能为空`)
  }
}

export function optional(key = ''): FormItemValidateFn<any> {
  return value => {}
} 

export function onlyIf(condition, func) {
  return (value) => {
    let isConditionMatch
    if (isFunction(condition)) {
      isConditionMatch = condition()
    } else {
      isConditionMatch = condition
    }
    if (isConditionMatch) return func(value)
  }
}

export function onlyJSON(key = '') {
  return (value) => {
    if (typeof value === 'object') return value
    try {
      JSON.parse(value)
    } catch (e) {
      throw new Error(`${key}必须是JSON`)
    }
  }
}

export function onlyStartWithSlash(key = '') {
  return value => {
    if (value.startsWith('/')) return value
    throw new Error(`${key}必须以/开头`)
  }
}

export function notContainUnderline(key = '') {
  return value => {
    if (value.indexOf('_') === -1) return value
    throw new Error(`${key}不能包含下划线，建议使用中划线`)
  }
}

export function checkFolder(key = '') {
  return value => {
    if (value.indexOf('.') === -1) return value
    throw new Error(`${key}名称不能包含 "."`)
  }
}

export function checkFile(key = '') {
  return value => {
    if (value.indexOf('.') !== -1) return value
    throw new Error(`${key}名称需要包含"."+文件后缀`)
  }
}

export function notHaveSlash(key = '') {
  return value => {
    if (value.indexOf('/') === -1 ) return value
    throw new Error(`${key}不能包含"/"`)
  }
}

export function notHaveUppercase() {
  return value => {
    const regex = /[A-Z]/
    if (regex.test(value)) throw new Error('名称不能包含大写字母')
    return value
  }
}

export function notStartWithNumber() {
  return value => {
    const regex = /^[0-9]/
    if (regex.test(value)) throw new Error('名称不能以数字开头')
    return value
  }
}

export function notContainHyphen() {
  return value => {
    const regex = /[_]/
    if (regex.test(value)) throw new Error('名称不能包含下划线，建议使用中划线')
    return value
  }
}

export function arrayNotEmpty(key = '', message = '不能为空') {
  return value => {
    if (value && value.length > 0) return value
    throw new Error(`${key}${message}`)
  }
}

export function maxLengthLimit(key = '', limit = 32) {
  return (value) => {
    if (value.trim().length <= limit) return value
    throw new Error(`${key}不能超过${limit}个字符`)
  }
}

export function minLengthLimit(key = '', limit = 10) {
  return (value) => {
    if (value.trim().length >= limit) return value
    throw new Error(`${key}不能少于${limit}个字符`)
  }
}

export function doNotContainKeys(key = '', keys: string[] = []) {
  return value => {
    if (!keys || (keys && keys.length === 0)) return value
    let val = {}
    try {
      val = JSON.parse(value)
    } catch (e) {
      throw new Error(`${key}必须是JSON`)
    }
    for (const _key of keys) {
      if (val[_key] != null) throw new Error(`${key}不能包含保留属性${keys.join()}`)
    }
    return value
  }
}

export function isValidVersion(key = '', message = '版本号格式不对, 请使用 major.minor.build格式') {
  return value => {
    const error = new Error(message)
    if (!value) throw error
    const version = value.split('.')
    if (version.length !== 3) throw error
    for (const v of version) {
      if (!v || Number.isNaN(parseInt(v, 10))) throw error
    }
    return value
  }
}

export function isProxyURL(key = '', message = '代理地址格式不正确') {
  return value => {
    const error = new Error(message)
    if (!value) throw error
    const parseUrlInfo = UrlParse(value, false)
    const { pathname } = parseUrlInfo
    const regex = /^\/app\/(.*)\/api\/proxy\/(.*)\/api\/([\w+|\d]+)(\/.*)/
    if (!regex.test(pathname)) throw error
    return value
  }
}

export function stringWithComma() {
  return value => {
    const regex = /[^%&'.;=?$\x22]+/
    if (!regex.test(value)) throw new Error('必须以逗号分割')
    return value
  }
}

export function alreadyExist(url, key = '', message = '已存在') {
  let timeoutId, resolve, reject
  // return value => {
  //   const error =  new Error(`${value} ${message}`)
  //   if (!value || (window as any).tempDisabledAlreadyExist === true) return
  //   if (timeoutId) {
  //     clearTimeout(timeoutId)
  //     resolve()
  //   }
  //   const promise = new Promise((_resolve, _reject) => {
  //     resolve = _resolve
  //     reject = _reject
  //   })
  //   timeoutId = setTimeout(
  //     () => get(url, { [key]: value })
  //     .then(data => {
  //       const { isExist } = data
  //       timeoutId = null
  //       if (isExist) return reject(error)
  //       return resolve(value)
  //     }), 
  //     500)
  //   return promise
  // }
  return null

}
