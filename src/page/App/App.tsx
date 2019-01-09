import * as React from 'react'
import { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Icon, Input} from 'antd'
import AppTable from './AppTable'
import "./index.css"

const Search = Input.Search

interface Props {
  form?: any
}

interface State {
  searchValue: string
}

const CREATE_POST = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(post: $post) {
      username, password
    }
  }
`
class APP extends Component<Props, {}> {

  state = {
    searchValue: ''
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

  setSeach = (value, delVal?: string) => {
    delVal === 'del' && this.setState({
      searchValue: ''
    })
    this.changeTaskFilter('task_name', value)
  }

  render() {
    return (
      <div className="appCon contentItem">
        <div className="contentHeader">
          <h2>app管理</h2>
          <div className='headerSearch'>
            <Search
              placeholder="搜索APP名称"
              onSearch={(e) => this.onSearchChange(e)}
              onChange={(e) => this.setSearchValue(e)}
              style={{ width: 190 }}
              defaultValue={this.state.searchValue}
            />
            {this.state.searchValue ? <Icon type='close-circle' onClick={() => { this.setSeach('', 'del') }} /> : null}
          </div>
        </div>
        <AppTable />
      </div>
    )
  }
}

export default APP