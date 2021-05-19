import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,HashRouter,Route,Redirect} from 'react-router-dom';

import './static/css/reset.min.css'
import './static/css/common.css'
import './static/css/list.css'

import Course from './router/Course.js';
import Courselist from './router/Courselist.js';
import CourseAdmin from './router/Admin/Course.js';
import CourselistAdmin from './router/Admin/Courselist.js';
import Person from './router/Person.js';

ReactDOM.render(
        <HashRouter>
            <main className="container">
                <Switch>
                    <Route path='/list' component={Courselist}/>
                    <Route path='/Course' component={Course}/>
                    <Route path='/book/zone/admin' component={CourseAdmin}/>
                    <Route path='/booklist/zone/admin' component={CourselistAdmin}/>
                    <Route path='/' component={Person}/>
                </Switch>
            </main>
        </HashRouter>
    ,document.getElementById('root'));