import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LoginPage } from './components/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';

export const routes = <Layout>
    <PrivateRoute exact path='/' component={ Home } />
    <Route exact path='/login' component = { LoginPage } />
</Layout>;