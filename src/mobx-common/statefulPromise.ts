import { observable, action, computed } from 'mobx'

export enum PromiseState {
  pending,
  fulfilled,
  rejected,
}

export class StatefulPromise<T> {
  constructor(promise: Promise<T> | T, initPendingValue?: T) {
    if (promise instanceof Promise) {
      this.promise = promise
      this.init()
      if (initPendingValue) this.initPendingValue(initPendingValue)
    } else {
      this.promise = Promise.resolve(promise)
      this.value = promise
      this.state = PromiseState.fulfilled
    }
  }

  promise: Promise<T>
  @observable state: PromiseState = PromiseState.pending
  @computed get isLoading() {
    return this.state === PromiseState.pending
  }
  @observable.ref value: T
  @computed get data() {
    return this.value
  }
  @observable error: Error

  @action initPendingValue(initPendingValue: T) {
    this.value = initPendingValue
  }

  @action onPromiseDone = (value) => {
    this.state = PromiseState.fulfilled
    this.value = value
  }

  @action onPromiseError = (err) => {
    this.state = PromiseState.rejected
    this.error = err
  }

  @action init() {
    this.promise.then(this.onPromiseDone).catch(this.onPromiseError)
  }
}

export function fromPromise<T>(promise: Promise<T>, initPendingValue?: T): StatefulPromise<T> {
  return new StatefulPromise<T>(promise, initPendingValue)
}

export function fromValue<T>(value: T): StatefulPromise<T> {
  return new StatefulPromise<T>(value)
}

export function fromFunc<T>(func: () => T|Promise<T>, initPendingValue?: T): StatefulPromise<T> {
  return new StatefulPromise<T>(Promise.resolve(func()), initPendingValue)
}

export const pendingPromise: StatefulPromise<any> = fromPromise(new Promise((resolve, reject) => {
  return
}))