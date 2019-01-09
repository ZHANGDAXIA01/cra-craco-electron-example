import { FormItem, FormItemStatus } from './formItem'
import { StatefulPromise, fromPromise, fromValue } from '../statefulPromise'
import { observable, action, computed } from 'mobx'
import { find } from 'lodash'
import Debug from 'debug'
const debug = Debug("form")

export interface FormSubmitOptions {
  url: string
  query: any
}

export type FormItemValueDictionary = {[key: string]: any} 

export interface FormOptions {
  name: string
  onSubmit?: (data: FormItemValueDictionary) => Promise<any>
  onReset?: () => any
  formItems: FormItem<any>[]
}

export class Form {
  constructor(options: FormOptions) {
    Object.assign(this, options)
  }

  name: string
  onSubmit: (data: FormItemValueDictionary) => {}
  onReset: () => any
  @observable submitPromise: StatefulPromise<any> = fromValue(undefined)
  @observable formItems: FormItem<any>[]
  
  @computed get params(): any {
    const formItemValueDictionary = {}
    this.formItems.forEach(formItem => formItemValueDictionary[formItem.id] = formItem.value)
    return formItemValueDictionary
  }
  @computed get errors(): any {
    const formItemErrorDictionary = {}
    this.formItems.forEach(formItem => formItemErrorDictionary[formItem.id] = formItem.error)
    return formItemErrorDictionary
  }

  @action setFormItems(formItems: FormItem<any>[]) {
    this.formItems = formItems
  }

  getFormItem(id) {
    const item = find(this.formItems, _item => _item.id === id)
    if (item == void 0) throw new Error(`FormItem ${id} not found in form`)
    return item
  }

  validateFormItem(id) {
    this.getFormItem(id).triggerValidate()
  }

  @action updateFormItem(key, value) {
    this.getFormItem(key).updateValue(value)
    this.submitPromise = fromValue(undefined)
  }

  @action reset() {
    this.formItems.forEach((formItem) => {
      formItem.reset()
    })
    this.submitPromise = fromValue(undefined)
    if (this.onReset != void 0) this.onReset()
  }

  isAnyFormItemError() {
    for (let i = 0, l = this.formItems.length; i < l; i++) {
      const formItem = this.formItems[i]
      if (formItem.status === FormItemStatus.error) {
        return { result: true, error: {
          message: `validate ${formItem.id} field failed with msg = ${formItem.error && formItem.error.message}`}
        }
      }
    }
    return { result: false, error: undefined }
  }

  @action submit = () => {
    const promises = this.formItems.map(formItem => formItem.triggerValidate())
    this.submitPromise = fromPromise(Promise.all(promises).then(() => {
      const { result, error: { message = 'some of params is illegal' } = {} } = this.isAnyFormItemError()
      if (result) {
        debug(message)
        throw new Error(message)
      }
      return 
    }).then(() => {
      if (!this.onSubmit) return null
      const formItemValueDictionary = {}
      this.formItems.forEach(formItem => formItemValueDictionary[formItem.id] = formItem.value)
      return this.onSubmit(formItemValueDictionary)
    }))
    return this.submitPromise.promise
  }

  destroy() {
    this.formItems.forEach(formItem => formItem.destroy())
  }
}

export default Form