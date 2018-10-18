import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { testApi } from './data/actions/actions';
import Loader from './component/loader/loader';
import { Route } from 'react-router-dom'
import home from './component/home/home';
import { Link } from 'react-router-dom'



class App extends Component {
  componentDidMount(){
    this.props.apiCall()
  }
  render() {
    return (
      <div className="App">
        <Loader/>
        <p>mi133 is up and running
          </p>
        <p>
          bootstrap is already installed.
        </p>
        <a className="btn btn-success">Fake Login</a>
      </div>
    );
  }
}
const stp = (state, props) => {
  return {
    state
  }
}
const atp = {
  apiCall: testApi 
}
export default connect(stp, atp)(App);
