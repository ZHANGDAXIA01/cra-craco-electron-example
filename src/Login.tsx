import * as React from 'react'
import { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form, Icon, Input, Button } from 'antd'
import "./index.css"

// const FormItem = Form.Item

// interface Props {
//   form?: any
// }

// const CREATE_POST = gql`
//   mutation CreatePost($post: CreatePostInput!) {
//     createPost(post: $post) {
//       username, password
//     }
//   }
// `
// class Login extends Component<Props, {}> {
//   // constructor(props) {
//   //   super(props)
//   //   fetch('/v1/userinfo?token=xy3kKbMtEUG', {
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     credentials: 'include',
//   //   })
//   //     .then(res => {
//   //       if (res.ok) return res.json()
//   //       throw new Error('get user info failed')
//   //     })
//   //     .then(data => {
//   //       if (!data.isError) {
//   //         this.props.store.commonManager.setUserName(data.data.name)
//   //         const newLocation = {
//   //           pathname: '/api',
//   //           state: {
//   //             fromLogin: true
//   //           }
//   //         }
//   //         return this.props.history.push(newLocation)
//   //       }
//   //       throw new Error(data.error && data.error.message)
//   //     })
//   //     .catch(err => console.error('get user name failed =', err))
//   // }

//   hasErrors = (fieldsError: any) => {
//     return Object.keys(fieldsError).some(field => fieldsError[field])
//   }



//   handleSubmit = (createPost: any) => {
//     const { form } = this.props;
//     form.validateFields((err: any, values: any) => {
//       if (!err) {
//         createPost({ variables: { post: values } });
//         form.resetFields();
//       }
//     });
//   }

//   render() {
//     const { getFieldDecorator, getFieldsError } = this.props.form
//     return (
//       <div className="loginCon">
//         <Mutation mutation={CREATE_POST}>
//         {(createPost, { loading, data }) => {
//           return (
//           <Form onSubmit={e => this.handleSubmit(createPost)} className="login-form">
//             <FormItem>
//               {getFieldDecorator('name', {
//                 rules: [{ required: true, message: 'Please input your Username!' }],
//               })(
//                 <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
//               )}
//             </FormItem>
//             <FormItem>
//               {getFieldDecorator('password', {
//                 rules: [{ required: true, message: 'Please input your Password!' }],
//               })(
//                 <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
//               )}
//             </FormItem>
//             <FormItem>
//               {/* <Button type="primary">
//                 <Link to="/register">Register</Link>
//               </Button> */}
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 disabled={this.hasErrors(getFieldsError())}
//               >
//                 Login
//               </Button>
//             </FormItem>
//           </Form>)
//         }}
//         </Mutation>
//       </div>
//     )
//   }
// }

// const WrappedLogin = Form.create()(Login as any)

// export default WrappedLogin