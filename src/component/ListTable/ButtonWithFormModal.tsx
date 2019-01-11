import * as React from 'react'
import { Component } from 'react'
import { Button, Modal, message } from 'antd'
import { FormItem as MobxFormItem, Form as MobxForm } from '../../mobx-common/form'
import { observer } from 'mobx-react'
import Form, { FormItemRenderOpts } from './Form'

export interface Col<T> {
  title: string
  dataIndex: string
  renderEditableItem?: (value: T, record: MobxFormItem<T>, form: MobxForm) => any // 如何在表单中渲染
}

interface Props {
  columes: Col<any>[]
  form: MobxForm
  onOpen?: Function
  onClose?: Function
  modalWidth?: string|number
  title: string
  icon?: string
  renderModal?: (form: any) => any
  disabled?: boolean
  zIndex?: number
  customButton?: (onClick: Function) => any
}

interface State {
  formSwitch: boolean
  loading: boolean
}

@observer
class ButtonWithFormModal extends Component<Props, State> {
  state = {
    formSwitch: false,
    loading: false,
  }

  blockBackListen = event => {
    alert('请先手动关闭当前表单')
    history.pushState(null, '', document.URL);
  }

  escListen = event => {
    if (event.code === 'Escape') {
      if ((window as any).ganjiang_editor_fullscreen || (window as any).ganjiang_editor_in_fullscreen) return
      event.preventDefault()
      event.stopPropagation()
      return alert('请先手动关闭当前表单')
    }
  }

  addBlockBackListen = () => {
    history.pushState(null, '', document.URL);
    window.addEventListener('popstate', this.blockBackListen, true)
    window.addEventListener('keydown', this.escListen, true)
  }

  removeBlockBackListen = () => {
    window.removeEventListener('popstate', this.blockBackListen, true)
    window.removeEventListener('keydown', this.escListen, true)
  }

  showForm = () => {
    this.addBlockBackListen()
    if (this.props.onOpen) this.props.onOpen()
    this.setState({
      formSwitch: true
    })
  }

  hideForm = (node, notUseFun?: any) => {
    this.removeBlockBackListen()
    this.setState({
      formSwitch: false,
      loading: false,
    })
    if (this.props.onClose && !notUseFun) this.props.onClose()
    this.resetForm()
  }

  submitForm = () => {
    this.setState({ loading: true })
    this.props.form.submit().then(() => this.hideForm(null, this.props.title === "Setting"))
    .catch(err => {
      this.setState({ loading:  false })
      message.error(err && err.message)
    })
  }

  resetForm = () => {
    const { form } = this.props
    return form.formItems.forEach(formItem => formItem.reset())
  }

  renderForm(form: MobxForm) {
    const { columes } = this.props
    const renderOpts = columes
    .filter(colume => colume.renderEditableItem != void 0)
    .map(colume => {
      return {
        title: colume.title,
        render: colume.renderEditableItem,
        formItem: form.getFormItem(colume.dataIndex)
      } as FormItemRenderOpts<any>
    })
    return <Form
      form={form}
      renderOpts={renderOpts}
    />
  }

  render() {
    const { title, modalWidth = 500, form, disabled = false, zIndex = 1001, customButton } = this.props
    const { formSwitch } = this.state
    return <div style={{ display: "inline-block", marginLeft: "10px"}}>
      {customButton ? customButton(this.showForm) : <Button className="new_button" onClick={this.showForm} icon={this.props.icon} disabled={disabled}>{this.props.children}</Button>}
      <Modal
        key={title}
        wrapClassName={title}
        width={modalWidth}
        title={title}
        visible={formSwitch}
        maskClosable={false}
        onOk={this.submitForm}
        zIndex={zIndex}
        onCancel={this.hideForm}
        footer={[
          <Button key="cancel" onClick={this.hideForm}>Cancel</Button>,
          <Button key="submit" type="primary" loading={this.state.loading} onClick={this.submitForm}>
            OK
          </Button>,
        ]}
      >
        {
          this.props.renderModal ?
          this.props.renderModal(this.renderForm(form)) :
          this.renderForm(form)
        }
      </Modal>
    </div>
  }
}

export default ButtonWithFormModal