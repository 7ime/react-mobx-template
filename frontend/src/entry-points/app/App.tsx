import * as React from 'react'
import {observer} from "mobx-react";
import {Route, Router, Switch} from 'react-router-dom';
const createBrowserHistory = require('history').createBrowserHistory;
const history = createBrowserHistory();

import '@styles/global.scss';
import {injectAware} from "../../common/annotations/dependency-injection";
import {HomeScene} from "../../scenes/HomeScene";

@observer
@injectAware()
export default class App extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={HomeScene}/>
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
