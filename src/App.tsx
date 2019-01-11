import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Layouts from './component/Layout'
import WrappedLogin from './page/Login/Login'

// Create the apollo client, with the Apollo caching. 
const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

import gql from "graphql-tag";

apolloClient.query({
    query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));
  
class App extends Component {

    render() {
        return (
          <BrowserRouter>
            <div className={classes.App}>
              <ApolloProvider client={apolloClient}>
                <Switch>
                    <Route path="/home"><Layouts /></Route>
                    <Route exact path='/login'><WrappedLogin /></Route>
                    <Redirect to="/home" />
                </Switch>              
              </ApolloProvider>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
