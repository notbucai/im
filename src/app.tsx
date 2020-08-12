import React, { Component } from 'react'
import { Provider } from 'react-redux';

import './app.scss'
import { store } from './global';


class App extends Component {

  render () {
    // this.props.children;
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;