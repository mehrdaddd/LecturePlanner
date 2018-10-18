import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store, test } from './data/store'
import home from './component/home/home';
import login from './component/login/login';
import './component/NavigationBar/NavigationBar.css';
import BaseLayout from './component/baselayout/baselayout';
import register from './register/register';
import profile from './component/profile/profile';
import coursecontainer from './component/coursecontainer/coursecontainer';
import location from './component/location/location';
import path from './component/path/path';
const defaultStore = store
const main = <Provider store={defaultStore}>
    <Router>
        <div className="container">        
            <BaseLayout exact path="/" component={home} />
            <BaseLayout exact path="/profile" component={profile} />
            <BaseLayout exact path="/profile/courses" component={coursecontainer} />
            <BaseLayout exact path="/profile/locations" component={location} />
            <BaseLayout exact path="/profile/locations/path" component={path} />
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
        </div>
    </Router>
</Provider>

test(defaultStore)

ReactDOM.render(main, document.getElementById('root'));
registerServiceWorker();
