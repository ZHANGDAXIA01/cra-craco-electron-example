import * as React from 'react'
import { Component } from 'react'
import { Icon, Menu, Dropdown } from 'antd'
import './index.css'

interface Props {
}

interface State {
  showUserGuide: number
}

class User extends Component<Props, State> {
  state = {
    showUserGuide: 1
  }
  userId: string
  user: HTMLDivElement | null

  userLogout = () => {
    // const { userManager } = this.props.store
    // userManager.logOut()
    // .then(data => {
    //   if (!data.isError && data.data === 'ok') {
    //     this.props.store.commonManager.setUserName(undefined)
    //     return location.hash = location.hash.replace(/#\/\w+/, '#/login')
    //   }
    //   throw new Error(data.error)
    // })
    // .catch(err => {
    //   throw err
    // })
  }
 
  menuClick = item => {
    switch (item.key) {
      case 'user-logout':
        return this.userLogout()
      case 'user-setting':
        break
        // return this.userSetting()
      default:
        console.warn(`there is no matching handle for ${item.key}, check your code`)
    }
  }

  render() {
    const { userName } = { userName: 'aaa' }
    const menu = <Menu onClick={this.menuClick}>
      <Menu.Item key='user-logout'><Icon type='logout' />Logout</Menu.Item>
    </Menu>
    return <div className={userName && "user" || "userHide"} ref={user => this.user = user}>
      <Dropdown 
        overlay={menu} 
        trigger={['click']} 
        getPopupContainer={(): any => this.user}
      >
        <span><Icon type="user" /><span style={{ marginRight: '10px', marginLeft: '3px' }}>{userName}</span><Icon type="down" /></span>
      </Dropdown>
    </div>
  }
}

export default User