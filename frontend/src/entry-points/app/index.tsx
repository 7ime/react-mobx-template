import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {unregister} from './registerServiceWorker'
import * as mobx from 'mobx'

import App from './App';
import {dependencyRegistration} from "../../common/dependency-registration";

mobx.useStrict(true)

dependencyRegistration()
  .then(() => {
    return ReactDOM.render(
      <App/>,
      document.getElementById('root')
    )
  })

unregister()
