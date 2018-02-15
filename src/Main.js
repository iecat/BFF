import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
// import {Router, Route} from 'react-router';
import Home from './Home'
import Detail from './Detail'

export default class Main extends React.Component
{
    render()
    {
        return (
            <Route exact path='/' component={Home} {...this.props}> </Route>
        )
    }
}







