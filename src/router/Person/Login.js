import React from "react";
import '../../static/css/Login.css'
import {withRouter} from 'react-router-dom'

import {getCookie,setCookie} from '../../api/cookie'
import {login}from '../../api/person'

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Courselist from "../Courselist";


class Login extends  React.Component{
    constructor(props,context){
        super(props,context);
    }
    handleClick(type){
        if(type==='admin'){
        this.props.history.push("/booklist/zone/admin");
        return;
      }
        this.props.history.push("/list");
  }
    render(){
        const onFinish = async values => {
             let result=await login(values);

          //if(result.code===1){
            if(result.value){

                setCookie('bookuser',result.value);
                setCookie('user',result.key);
                setCookie('bookInfo',result.bookInfo);

              this.handleClick(result.type);
            }else {
                return alert('用户不存在')
            }
        };
    return<Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        style={{display:'block',margin:'200px auto 0',width:'350px'}}
    >
        <div>
            <table style={{width:"100%", margin :"10px",border:"2px,solid"}}>
                <tr>
                    <th>type</th>
                    <th>name</th>
                    <th>passwd</th>
                </tr>
                <tr>
                    <td>general user</td>
                    <td>test</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>admin user</td>
                    <td>james</td>
                    <td>1</td>
                </tr>
            </table>
        </div>
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
           {/* Or <a href="">register now!</a>*/}
        </Form.Item>
    </Form>
    }

}

export default withRouter(Login);
