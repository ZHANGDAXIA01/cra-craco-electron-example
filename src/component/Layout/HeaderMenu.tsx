import * as React from 'react'
import { PureComponent } from 'react'
import { Menu, Icon} from 'antd'
import "./index.css"

const { SubMenu } = Menu;

interface Props {
  form?: any
}

interface State {
  collapsed: boolean
}

const createTypes = ["newTestApi", "newApi", "newApp", "newDS"]

class HeaderMenu extends PureComponent<Props, State> {

  state = {
    collapsed: false
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Menu
        className="headerMenu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      >
        <SubMenu className="topSelectMenuItem" title={<span className="submenu-title-wrapper"><Icon type="file-add" />New</span>}>
          {
            createTypes.map(item => <Menu.Item key={item}>{item}</Menu.Item> )
          }
        </SubMenu>
        <SubMenu className="topSelectMenuItem" title={<span className="submenu-title-wrapper"><Icon type="file-unknown" />Help</span>}>
          <Menu.Item key="Help_Introductory_Tutorial">Tutorial</Menu.Item>
          <Menu.Item key="Help_Internal_Variables">Internal Vars</Menu.Item>
          <Menu.Item key="Help_Dev_Full_Screen">DEV</Menu.Item>
          <Menu.Item key="Help_Basic_Function_Template">Templates</Menu.Item>
          <Menu.Item key="Help_Error_Codes">Error Codes</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default HeaderMenu