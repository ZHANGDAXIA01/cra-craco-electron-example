import { observable, action } from 'mobx'
import Debug from 'debug'
const debug = Debug("form")

export type FormItemValidateFn<T> = (value: T) => any|Promise<any>
export type OnValueUpdate = (value) => any
export enum FormItemStatus {
  none,
  success,
  error,
  validating
}

export class FormItem<T> {
  constructor(id: string, resetValue: T | (() => T), validate: FormItemValidateFn<T> = (value) => {}, onValueUpdate?: OnValueUpdate, triggerValidateOnUpdate: boolean = true) {
    this.id = id
    this.resetValue = resetValue
    this.value = typeof this.resetValue === 'function' ? this.resetValue() : this.resetValue
    this.validate = validate
    if (onValueUpdate) this.onValueUpdate = onValueUpdate
    this.triggerValidateOnUpdate = triggerValidateOnUpdate
  }

  id: string
  resetValue: any
  validate: FormItemValidateFn<T>
  onValueUpdate: OnValueUpdate
  triggerValidateOnUpdate: boolean
  validatePromise: Promise<any>
  validateValue: T
  
  @observable value: T
  @observable error: Error | null
  @observable status: FormItemStatus = FormItemStatus.none

  @action triggerValidate = () => {
    // if (this.validateValue === this.value) return this.validatePromise
    this.validateValue = this.value

    this.status = FormItemStatus.validating
    this.error = null

    const promise = this.validatePromise = Promise.resolve(this.validateValue).then(this.validate).then(() => {
      if (this.validatePromise === promise) {
        this.status = FormItemStatus.success
      } else {
        debug("validate result is outdate")
      }
    }).catch(action((err: any) => {
      if (this.validatePromise === promise) {
        this.status = FormItemStatus.error
        this.error = err
      } else {
        debug("validate result is outdate")
      }
    }))
    return promise
  }
  @action reset = () => {
    this.value = typeof this.resetValue === 'function' ? this.resetValue() : this.resetValue
    this.status = FormItemStatus.none
    this.error = null
  }
  @action updateValue = (value: T) => {
    this.value = value
    if (this.triggerValidateOnUpdate) {
      this.triggerValidate()
    }
    if (this.onValueUpdate) {
      this.onValueUpdate(value)
    }
  }
  destroy() {
  }
}