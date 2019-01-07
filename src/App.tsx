import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'

import Logo from './Logo/Logo';
import TestFs from './model/TestFs';
// import WrappedLogin from './Login'

// Create the apollo client, with the Apollo caching. 
const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:3003/api"
})

class App extends Component {

    render() {
        return (
          <div className={classes.App}>
            {/* <header className={classes.AppHeader}>
              <Logo />
              <textarea className={classes.TextArea} value={TestFs.getDirectoryListing()} readOnly rows={20} />
            </header> */}
          </div>
        );
    }
}

export default App;
