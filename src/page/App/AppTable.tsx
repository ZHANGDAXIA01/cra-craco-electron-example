import * as React from 'react'
import { Component } from 'react'
import { Table, Input, Button, Modal, Upload, Icon} from 'antd'
import "./index.css"

const TextArea = Input.TextArea

interface Props {
  form?: any
}

interface State {
  searchValue: string,
  isVisible: boolean
}

const taskList = [{
  id: 1,
  name: "js1",
  token: 123, 
  language: 'javascript',
  template: 'basic',
  author: 'aaa',
  test_case_cfg: '{ }',
  gmt_modified: "2019-01-04 10:27:10"
},{
  id: 2,
  name: "js2",
  token: 123, 
  language: 'javascript',
  template: 'basic',
  author: 'aaa',
  test_case_cfg: '{ }',
  gmt_modified: "2019-01-04 10:27:11"
}]
class AppTable extends Component<Props, State> {

  state = {
    searchValue: '',
    isVisible: false
  }

  onSearchChange = (e) => {
    this.setState({
      searchValue: e
    })
    this.changeTaskFilter('task_name', e)
  }

  setSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  changeTaskFilter (type, value) {
    // const { TaskStore } = this.props
    // TaskStore.setTipsInfo(false)
    // TaskStore.setTaskFilter(type, value.replace(/(^\s*)|(\s*$)/g, ''))
    // TaskStore.setTaskFilter('page_num', 1)
    // TaskStore.getTaskList()
  }

  clickAppEdit = () => {
    this.setState({
      isVisible: true
    })
  }

  onCloseModal = () => {
    this.setState({
      isVisible: false
    })
  }

  setSeach = (value, delVal?: string) => {
    delVal === 'del' && this.setState({
      searchValue: ''
    })
    this.changeTaskFilter('task_name', value)
  }

  formatterColumn = (isDidabled = true) => {
    const columes = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: "5%"
      },
      {
        title: "名字",
        dataIndex: "name",
        key: "name",
      },{
        title: "token",
        dataIndex: "token",
        key: "token",
      },{
        title: "language",
        dataIndex: "language",
        key: "language",
      },{
        title: "template",
        dataIndex: "template",
        key: "template",
      },{
        title: "author",
        dataIndex: "author",
        key: "tempauthorlate",
      },{
        title: "测试全局变量",
        dataIndex: "test_case_cfg",
        key: "test_case_cfg",
        width: "15%",
        render: (text, record) => <TextArea rows={3} value={text} readOnly={true}  />
      },{
        title: "最近修改时间",
        dataIndex: "gmt_modified",
        key: "gmt_modified",
      },{
        title: "操作",
        width: "20%",
        render: (text, record) => <div>
          <Button onClick={this.clickAppEdit}>编辑</Button>
          <Button>删除</Button>
        </div>
      }]

    return columes
  }

  renderContent = () => {
    const fileList:any[] = [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return <div>
      <div className="relogin-form">
        <span style={{marginRight: '43px'}}>name:</span> 
        <Input placeholder="app name" value='js1' />
      </div>
      <div className="relogin-form">
        <span>token:</span>
        <Input value='123' />
      </div>
      <div>
        <p>images:</p>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
      </div>
    </div>
  }

  render() {
    return (
      <div className="appTableCon">
         <Table
          columns={this.formatterColumn()}
          dataSource={taskList}
          pagination={false}
          rowKey={record => record.id}
        />
        {
          this.state.isVisible && (
            <Modal
              visible={this.state.isVisible}
              title='App 编辑'
              onCancel={this.onCloseModal}
            >
              {this.renderContent()}
            </Modal>
          )
        }
      </div>
    )
  }
}

export default AppTable