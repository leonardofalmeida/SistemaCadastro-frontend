import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import User from './pages/user';
import Register from './pages/register';
import Maps from './pages/map'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/users/:id" component={User}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/maps" component={Maps}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;