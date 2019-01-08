import * as React from 'react'
import { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Icon, Input, Button } from 'antd'
import "./index.css"

const FormItem = Form.Item

interface Props {
  form?: any
}

const CREATE_POST = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(post: $post) {
      username, password
    }
  }
`
class APP extends Component<Props, {}> {

  render() {
    return (
      <div className="appCon contentItem">
        <div className="contentHeader">app管理</div>
      </div>
    )
  }
}

export default APP