import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'
import WrappedLogin from './page/Login/Login'
import Layouts from './component/Layout'

// Create the apollo client, with the Apollo caching. 
const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:3003/api"
})

class App extends Component {

    render() {
        return (
          <div className={classes.App}>
            <ApolloProvider client={apolloClient}>
              {/* <WrappedLogin /> */}
              <Layouts />
            </ApolloProvider>
          </div>
        );
    }
}

export default App;
