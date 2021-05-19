import React from 'react';

import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout,Collapse } from 'antd';
import Login from './Person/Login.js'

const { Panel } = Collapse;
const { Header, Content } = Layout;


class Person extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={isLogin:false};
    }

    render(){
        return <Layout className="layout">
            <Header>
                <div className="title"> </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Login/>
                    </div>
            </Content>
        </Layout>
    }
};
export default Person;