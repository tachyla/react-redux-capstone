import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";

import Quiz from './components/quiz.js';

import Header from './components/header.js';

import UserHistory from './components/userHistory';

import { setUserData } from "./actions/action";



class App extends Component {


  componentDidMount(){
    let cookieIdexists = false;
    let cookieId = document.cookie.split(';').map((val) => {
      return val.split('=');
    }).forEach(val => {
      if(val[0] === 'id') {
        cookieIdexists = true;
        return fetch(`/api/users/${val[1]}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.props.dispatch(setUserData(res));
        }) 
      }
    });
    

    if(!cookieIdexists) {
      return fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).then(res => {
        console.log(res);
        return res.json();
      }).then(result => {
        console.log(result[0].id);
        document.cookie = `id=${result[0].id}`;
        this.props.dispatch(setUserData(result[0]));
        return result;
      })
      .catch(err => console.error(err));
    }
  }

  render() {
    
    return (
      <div className="App">
       <Header />
       <UserHistory />
       <Quiz />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   userToken: state.userToken
// });

export default connect()(App);
