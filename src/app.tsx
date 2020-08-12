import React, { Component } from 'react'

import './app.scss'

class App extends Component {

  render () {
    return this.props.children;
    // return (
    //   <Provider store={store}>
    //     {this.props.children}
    //   </Provider>
    // )
  }
}

export default App;