import * as React from 'react'
import { PureComponent } from 'react'
import { Menu, Icon, } from 'antd'
import "./index.css"

const { SubMenu } = Menu;

interface Props {
  onCollapse: () => void
  openKeys: any[]
  form?: any
}

const menuList = [
  {
    name: "APP",
    icon: 'user',
    key: 'app',
    child: [
      {
        name: "app管理",
        key: 'app管理'
      }
    ]
  },{
    name: "API",
    icon: 'laptop',
    key: 'api',
    child: [
      {
        name: "item3",
        key: 'item3'
      },{
        name: "item4",
        key: 'item4'
      }
    ]
  },{
    name: "DataSource",
    icon: 'notification',
    key: 'dataSource',
    child: [
      {
        name: "item5",
        key: 'item5'
      },{
        name: "item6",
        key: 'item6'
      }
    ]
  },{
    name: "TestCase",
    icon: 'user',
    key: 'testCase',
    child: [
      {
        name: "item7",
        key: 'item7'
      }
    ]
  }
]

class SiderMenu extends PureComponent<Props, {}> {

  renderMenuItem = (menuList) => {
    const menuItem = menuList.map(item => {
      if (!item.child) {return <Menu.Item key={item.key}>{item.name}</Menu.Item>} 
      return <SubMenu 
        key={item.key} 
        title={<span>{item.icon && <Icon type={item.icon} /> }{item.name}</span>}
      >
        {this.renderMenuItem(item.child)}
      </SubMenu>
    })
    return menuItem
  }

  render() {
    return (<div className="siderMenuCon">
        <div className='tigger'><Icon type='bars' className='open' onClick={this.props.onCollapse} /></div>
        <Menu 
          theme='dark' 
          mode='inline' 
          // onOpenChange={this.onOpenChange} 
          // onClick={this.siderClick} 
          // openKeys={this.props.openKeys} 
          defaultSelectedKeys={['app管理']}
          defaultOpenKeys={['app']}
          // selectedKeys={siderSelectedValue === 'createTask' ? ['taskManage'] : [siderSelectedValue]}
        >
          {this.renderMenuItem(menuList)}
        </Menu>
      </div>
    )
  }
}


export default SiderMenu