import * as React from 'react'
import { Component } from 'react'
import { Table, Modal, Button } from 'antd'
import { StatefulPromise } from '../../mobx-common/statefulPromise'
import { FormItem as MobxFormItem, Form as MobxForm } from '../../mobx-common/form'
import { observer } from 'mobx-react'
import Form, { FormItemRenderOpts } from './Form'
import { find } from "lodash"
import ButtonWithFormModal from './ButtonWithFormModal'

export interface Col<T> {
  title: string
  dataIndex: string
  renderEditableItem?: (value: T, record: MobxFormItem<T>, form: MobxForm) => any // 如何在表单中渲染
  renderItem?: (listTable: ListTable, value: T, record: any) => any, // 如何在列表中渲染
  sorterOrFilter?: any,
  width?: number,
  help?: string
}

interface Props {
  columes: Col<any>[]
  datasource: StatefulPromise<any>
  createForm: MobxForm
  onCreateFormShow?: Function
  onCreateFormHide?: Function
  updateForm: MobxForm
  onUpdateFormShow?: Function
  onUpdateFormHide?: Function
  modalWidth?: string|number
  name?: string
  renderTopButtons?: () => any
  renderEditModal?: (form: any) => any
  onlyNewButton?: boolean
  newTitle?: string
  disabled?: boolean
  zIndex?: number
  customButton?: (onClick: Function) => any
}

interface State {
  createFormSwitch: boolean
  updateFormSwitch: boolean
  hasError: boolean,
  loading: boolean
}

@observer
class ListTable extends Component<Props, State> {
  state = {
    createFormSwitch: false,
    updateFormSwitch: false,
    hasError: false,
    loading: false
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

  showUpdateForm = (editItemPromise: Promise<any>, showForm = true, callback) => {
    const arr: any = ['query', 'output']
    editItemPromise.then((editItem) => {
      if (showForm) {
        this.addBlockBackListen()
        this.props.updateForm.formItems.forEach(formItem => {
          const colume = find(this.props.columes, { dataIndex: formItem.id })
          if (colume != void 0) {
            formItem.updateValue(
              arr.includes(colume.dataIndex)
              ? JSON.stringify(editItem[colume.dataIndex], null, 2)
              : editItem[colume.dataIndex]
            )
          }
        })
        this.setState({
          updateFormSwitch: true
        })
      }
      if (this.props.onUpdateFormShow) this.props.onUpdateFormShow()
      if ( callback ) {callback({_ganjiang_name: "ds"})}
    }).catch(err => {
      this.removeBlockBackListen()
      this.setState({
        updateFormSwitch: false
      })
    })
  }

  hideUpdateForm = () => {
    this.removeBlockBackListen()
    this.props.updateForm.reset()
    this.setState({
      updateFormSwitch: false,
      loading: false
    })
    if (this.props.onUpdateFormHide) this.props.onUpdateFormHide()
  }

  submitUpdateForm = () => {
    this.setState({loading: true})
    this.props.updateForm.submit().then(() => {
      this.hideUpdateForm()
    })
    .catch(err => {
      console.error('update error:', err)
    })
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

  componentDidCatch(error, info) {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    const { datasource, columes, createForm, onCreateFormHide, onCreateFormShow, updateForm, modalWidth, onlyNewButton = false, newTitle = '新建', disabled, zIndex = 1000 } = this.props
    const { updateFormSwitch } = this.state
    return <div className='list-table'>
      <div className='top-buttons'>
        <ButtonWithFormModal
          modalWidth={modalWidth}
          form={createForm}
          customButton={this.props.customButton}
          renderModal={this.props.renderEditModal}
          zIndex={onlyNewButton ? 1004 : zIndex}
          columes={columes}
          disabled={disabled}
          onClose={() => {
            return onCreateFormHide && onCreateFormHide()
          }}
          onOpen={() => {
            return onCreateFormShow && onCreateFormShow()
          }}
          title={newTitle}
        >{newTitle}</ButtonWithFormModal>
        {!onlyNewButton && this.props.renderTopButtons ? this.props.renderTopButtons() : null}
      </div>
      {
        <Modal
          width={modalWidth}
          title="修改"
          maskClosable={false}
          zIndex={1001}
          visible={updateFormSwitch}
          onOk={this.submitUpdateForm}
          onCancel={this.hideUpdateForm}
          wrapClassName="changeWrapModal"
          footer={[
            <Button key="cancel" onClick={this.hideUpdateForm}>Cancel</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.submitUpdateForm}>
              OK
            </Button>,
          ]}
        >
          {
            this.props.renderEditModal ?
            this.props.renderEditModal(this.renderForm(updateForm)) :
            this.renderForm(updateForm)
          }
        </Modal>
      }

      {onlyNewButton ? null : <div className='table-contents'><Table
        rowKey="id"
        loading={datasource.isLoading} 
        dataSource={datasource.value}
        columns={columes
          .filter(col => col.renderItem != void 0)
          .map(col => {
            const { title, dataIndex, renderItem, sorterOrFilter, ...rest} = col
            return {
              title: title,
              dataIndex: dataIndex,
              render: (renderItem as any).bind(null, this),
              ...sorterOrFilter,
              ...rest
            }
          })
        } 
      /></div>}
    </div>
  }
}

export default ListTable