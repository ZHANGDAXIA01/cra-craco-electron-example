import * as React from 'react'
import { Button, Popconfirm } from 'antd'
import { isFunction } from 'lodash'
import './ActionItem.css'

interface Props {
  record: any
  title: string
  manager: {
    getDetail: (record, opt?) => Promise<any>
    remove: (record) => Promise<any>
  }
  listTable: {
    showUpdateForm: (detailPromise: Promise<any>, showForm?: boolean , callback ?: any) => any,
  },
  apiAction?: any,
  extension?: any
  removeBtns?: string[]
}

class DefaultActionCol extends React.Component<Props> {
  shouldComponentUpdate(nextProps) {
    const properties = ['record', 'title']
    for (const key of properties) {
      const originalVal = JSON.stringify(this.props[key])
      const val = JSON.stringify(nextProps[key])
      if (originalVal !== val) return true
    }
    return false
  }
  editClick = () => {
    const { listTable, manager, record, apiAction } = this.props
    return listTable.showUpdateForm(manager.getDetail(record), apiAction ? false : true, apiAction)
  }
  delConfirm = () => {
    const { manager, record } = this.props
    return manager.remove(record)
  }

  checkIsShow = (val) => {
    if (this.props.removeBtns) {
      return !(this.props.removeBtns as any).includes(val)
    }
    return true
  }

  render() {
    const { title, extension = null } = this.props
    return <div className="action-box">
      {this.checkIsShow("编辑") && 
      <Button className="action-item" onClick={this.editClick}>编辑</Button>}
      {this.checkIsShow("删除") && 
        <Popconfirm
          title={title}
          onConfirm={this.delConfirm}
          okText="Yes"
          cancelText="No">
          <Button className="action-item">删除</Button>
        </Popconfirm>
      }
      {isFunction(extension) ? extension() : extension}
    </div>
  }
}
export default DefaultActionCol