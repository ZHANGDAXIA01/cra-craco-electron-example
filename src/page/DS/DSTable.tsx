import * as React from 'react'
import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { 
  Table, Input, Button,
  Modal, Upload, Icon, 
  Select, AutoComplete
} from 'antd'
import { graphql, Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import DefaultActionCol from '../../component/ListTable/DefaultActionCol'
import ButtonWithFormModal from '../../component/ListTable/ButtonWithFormModal'
import "./index.css"

const AppListBySearch = require('../../graphql/AppListBySearch.gql')
const TextArea = Input.TextArea
const Option = Select.Option

interface Props {
  store?: any
  form?: any
  onlyNewButton?: boolean
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

@observer
class DSTable extends Component<Props, State> {

  // @graphql(AppListBySearch, {
  //   options: props => {
  //     return {
  //       variables: {
  //         searchVal: props.match.params.searchVal,
  //       }
  //     };
  //   },
  // })

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

  renderColumn = (isDidabled = true) => {
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

  // formatterColumn = (isDidabled = true) => {
  //   const { appManager, apiManager, testCaseJobManager, uiManager } = this.props.store
  //   const appUncoverApiPathsMap = this.getAppUncoverApiPathsMap() // for mobx watch
  //   const { appTestCaseSumMap, appApiSumMap } = appManager
  //   const form = this.props.onlyNewButton ? appManager.createForm : appManager.updateForm
  //   const itemDisabled = this.props.onlyNewButton === true || isDidabled === false
  //   ? false : true
  //   const columes: Col<any>[] = [
  //     {
  //       title: "id",
  //       dataIndex: "id",
  //       renderItem: (listTable, value, record) => value,
  //     },
  //     {
  //       title: "名字",
  //       dataIndex: "name",
  //       renderItem: (listTable, value) => {
  //         if (!appManager.appSearchValue) return value
  //         const reg = new RegExp(appManager.appSearchValue, 'gi')
  //         const match = value.match(reg)
  //         if (!match) return value
  //         return <span>
  //           {
  //             value.split(reg).map((text, i) => (
  //               i > 0 ? [<span className="highlight" key={`${value}-${i}`}>{match[i - 1]}</span>, text] : text
  //             ))
  //           }
  //         </span>
  //       },
  //       renderEditableItem: (value, record) => <Input 
  //         value={value} 
  //         disabled={itemDisabled}
  //         onChange={(e) => record.updateValue(e.target.value)} 
  //       />,
  //       sorterOrFilter: {
  //         filterDropdownVisible: this.state.appFilterDropdownVisible,
  //         filterIcon: <Icon type="search" style={{ color: '#aaa', left: "42px" }} />,
  //         filterDropdown: (
  //           <div className="custom-filter-dropdown">
  //             <AutoComplete
  //               style={{ width: 400 }}
  //               allowClear={true}
  //               ref={ele => this.searchInput = ele}
  //               value={appManager.appSearchValue}
  //               dataSource={appManager.filterList.dropDownAppList}
  //               onSelect={this.onAppSearch}
  //               onSearch={this.onAppSearch}
  //               placeholder="search app name"
  //             />
  //           </div>
  //         ),
  //         onFilterDropdownVisibleChange: (visible) => {
  //           this.setState(
  //             (prevState, props) => ({
  //               appFilterDropdownVisible: visible,
  //             }),
  //             () => this.searchInput && this.searchInput.focus())
  //         },
  //       }
  //     },
  //     {
  //       title: "token",
  //       dataIndex: "token",
  //       renderItem: (listTable, value) => value,
  //       renderEditableItem: (value, record) => <Input disabled={itemDisabled} value={value} onChange={(e) => record.updateValue(e.target.value)} />
  //     },
  //     {
  //       title: "language",
  //       dataIndex: "language",
  //       renderItem: (listTable, value, record) => value,
  //       renderEditableItem: (value, record) => {
  //         return <Select
  //           value={`${value}`}
  //           onChange={val => {
  //             record.updateValue(val)
  //             form.getFormItem('template').updateValue('basic')
  //           }}
  //           disabled={itemDisabled}
  //         >
  //           <Option key="javascript" value='javascript'>javascript</Option>
  //           <Option key="java" value='java'>java</Option>
  //           <Option key="python" value='python'>python</Option>
  //         </Select>
  //       }
  //     },
  //     {
  //       title: "template",
  //       dataIndex: "template",
  //       renderItem: (listTable, value, record) => value,
  //       renderEditableItem: (value, record) => {
  //         return <Select
  //           value={`${value}`}
  //           onChange={val => record.updateValue(val)}
  //           disabled={itemDisabled}
  //         >
  //           {
  //             TemplateWithLanguage[form.getFormItem('language').value]
  //             .map(item => <Option key={item} value={item}>{item}</Option> )
  //           }
  //         </Select>
  //       }
  //     },
  //     {
  //       title: "author",
  //       dataIndex: "author",
  //       renderItem: (listTable, value, record) => value
  //     },
  //     {
  //       title: "测试全局变量",
  //       dataIndex: "test_case_cfg",
  //       renderItem: (listTable, value) => <TextArea rows={5} value={value} readOnly={true} onClick={apiManager.copyStr.bind(apiManager, value)} />,
  //       renderEditableItem: (value, record) => <TextArea rows={5} value={value} onChange={(e) => record.updateValue(e.target.value)} />
  //     },
  //     this.wrapCol({
  //       title: "操作",
  //       dataIndex: "action",
  //       width: 540,
  //       renderItem: (listTable, value, record) => {
  //         return <DefaultActionCol 
  //           listTable={listTable}
  //           manager={appManager}
  //           title={`删除App会对在该App下的api和测试用例进行级联删除，你确定要删除 ${record.name} 吗?`}
  //           record={record}
  //           // apiAction={() => {
  //           //   uiManager.setCurrentApp(record.id)
  //           // }}
  //           extension={() => ([
  //             <Button 
  //               key="ideButton" 
  //               onClick={this.clickIdeBtn.bind(this, record)}
  //               style={{marginLeft: "10px"}}
  //             >studio</Button>,
  //             <Button 
  //               key="terminalButton" 
  //               onClick={this.clickttyBtn.bind(this, record)}
  //               style={{marginLeft: "10px"}}
  //             >终端</Button>,
  //             this.renderOperationButton(record),
  //             <ButtonWithFormModal
  //               key="appButtons"
  //               modalWidth={900}
  //               form={appManager.createForm}
  //               columes={this.formatterColumn(false)}
  //               onOpen={() => {
  //                 const createForm = appManager.createForm
  //                 appManager.getDetail(record)
  //                 .then(app => {
  //                   for (const formItem of createForm.formItems) {
  //                     let val = ''
  //                     const itemName = formItem.id
  //                     switch (itemName) {
  //                       case 'name':
  //                         val = `${app[itemName]}-clone`
  //                         break
  //                       default:
  //                         val = app[itemName]
  //                     }
  //                     formItem.updateValue(val)
  //                   }
  //                 })
  //                 .catch(err => {throw err})
  //               }}
  //               title="克隆"
  //             >克隆</ButtonWithFormModal>,
  //             <TestCaseJobs
  //               key="testJobs"
  //               store={this.props.store}
  //               onOpen={() => testCaseJobManager.runTestCaseJobs(record.id)}
  //               onClose={testCaseJobManager.reset}
  //             />,
  //             this.renderUncoverApis(appUncoverApiPathsMap[record.id], appApiSumMap[record.id]),
  //             <span key="testItems" className="action-item">测试用例个数: {appTestCaseSumMap[record.id] || 0}</span>
  //             ])}
  //         />
  //       }
  //     }),
  //     this.wrapCol({
  //       title: "最近修改时间",
  //       dataIndex: "gmt_modified",
  //       renderItem: (listTable, value) => {
  //         return moment(new Date(value)).format("YYYY-MM-DD HH:mm:ss")
  //       },
  //       sorterOrFilter: {
  //         sorter: (a, b) => {
  //           if (a.gmt_modified < b.gmt_modified) return -1
  //           if (a.gmt_modified > b.gmt_modified) return 1
  //           return 0
  //         }
  //       }
  //     })
  //   ]

  //   return columes
  // }

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

  renderTable = () => {
    return <Query query={AppListBySearch} variables={{ searchVal: 5 }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <select name="dog">
            {data.dogs.map(dog => (
              <option key={dog.id} value={dog.breed}>
                {dog.breed}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  }

  render() {
    return (
      <div className="appTableCon">
        <Table
          columns={this.renderColumn()}
          dataSource={taskList}
          pagination={false}
          rowKey={record => record.id}
        />
        {
          this.state.isVisible && (
            <Modal
              visible={this.state.isVisible}
              title='DataSource 编辑'
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

export default DSTable