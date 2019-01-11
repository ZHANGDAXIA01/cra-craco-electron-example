import * as React from 'react'
import { Component } from 'react'
import { Form as MobxForm, FormItem as MobxFormItem } from '../../mobx-common/form'
import { Form } from 'antd'
import { observer } from 'mobx-react'

const FormItem = Form.Item

export interface FormItemRenderOpts<T> {
  title: string,
  render: (value: T, record: any, form: MobxForm) => any
  formItem: MobxFormItem<T>
}

type LayoutOpt = 'horizontal'|'vertical'|'inline'

export interface Props {
  form: MobxForm,
  renderOpts: FormItemRenderOpts<any>[],
  layoutOpt?: LayoutOpt
}

export interface State {}

type ValidateStatus = 'success' | 'warning' | 'error' | 'validating'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@observer
export default class MyForm<P, S> extends Component<P & Props, S & State> {

  getFieldStatus(key: string): {help?: string, validateStatus: ValidateStatus} {
    const {form} = this.props
    const error = form.errors[key]
    if (error == void 0) {
      return {
        help: undefined,
        validateStatus: 'success'
      }
    }
    return {
      help: error.message,
      validateStatus: 'error',
    }
  }

  getFieldValue(key: string) {
    const {form} = this.props
    return form.params[key]

  }

  onFieldChange(key: string, getValue = (e) => e.target.value) {
    return (e) => {
      this.props.form.updateFormItem(key, getValue(e))
    }
  }
  getFieldValueAndChanger(key: string, getValue?) {
    return {
      value: this.getFieldValue(key),
      onChange: this.onFieldChange(key, getValue)
    }
  }

  render() {
    const { form, renderOpts, layoutOpt} = this.props
    const formItemLayouts = layoutOpt && {} || formItemLayout
    return <Form onSubmit={form.submit} layout={layoutOpt || "horizontal"}>
      {
        renderOpts.map(itemRenderOpts => {
          const formItem = itemRenderOpts.formItem
          return <FormItem
            {...formItemLayouts}
            {...this.getFieldStatus(formItem.id)}
            key={formItem.id}
            label={itemRenderOpts.title}
          >
            {itemRenderOpts.render(formItem.value, formItem, form)}
          </FormItem>
        })
      }
    </Form>
  }
}