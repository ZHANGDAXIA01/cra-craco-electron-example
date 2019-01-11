import AppManager from './app'
import ApiManager from './api'

export default class rootStore {
  appStore = new AppManager()
  apiStore = new ApiManager()
}