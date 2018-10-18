import React, { Component } from 'react';
import { connect } from 'react-redux'
import './login.css';
import Loader from '../loader/loader';
import { loginApi } from '../../data/actions/login-actions';
import { withRouter, Link } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props)
  }
  login = (e) => {
    e.preventDefault()
    this.props.login(this.email.value, this.password.value, () => {
      this.props.history.push("/")
    })
  }
  render() {
    const { status } = this.props
    return (
      <div className="text-center">
        <Loader loading={status} />
        <form className="form-signin">
          <img className="mb-4" src="data:image/png;base64,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" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" ref={me => this.email = me} required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" ref={me => this.password = me} required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.login(e)} >Sign in</button>
          <Link className="btn btn-lg btn-primary btn-block" to={"/register"} activeclassname="active">Register</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}
const stp = (state, props) => {
  return {
    status: state.profile.request_status
  }
}
const atp = {
  login: loginApi
}
export default connect(stp, atp)(Login);
