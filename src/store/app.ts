import { 
  Form, FormItem, FormItemValueDictionary, 
  required, maxLengthLimit, all, 
  optional, onlyJSON, alreadyExist, 
  notContainUnderline, minLengthLimit, notHaveUppercase,
  notStartWithNumber, notContainHyphen
} from '../mobx-common/form'
import { fromFunc, StatefulPromise } from '../mobx-common/statefulPromise'
import rootStore from './index';

class AppManager {

  rootStore: any = rootStore
  
  createForm: Form
  initCreateForm() {
    this.createForm = new Form({
      name: "新建应用",
      formItems: [
        new FormItem("id", ""),
        new FormItem("name", "", all([
          required(), 
          maxLengthLimit('name'), 
          alreadyExist('/app/checkRules?name={name}', 'name'), 
          notContainUnderline('name'),
          notHaveUppercase(),
          notStartWithNumber(),
          notContainHyphen()
        ])),
        new FormItem("token", this.rootStore.commonManager.generateRandomToken, all([required(), optional(), maxLengthLimit('token', 11), minLengthLimit('token', 11)])),
        new FormItem("template", "basic"),
        new FormItem("language", "javascript"),
        new FormItem("test_case_cfg", "{}", all([required(), onlyJSON('test_case_cfg')])),
      ]
    })
  }

}

export default AppManager