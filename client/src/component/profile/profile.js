import React, { Component } from 'react';
import { connect } from 'react-redux'
import './profile.css';
import Loader from '../loader/loader';
import { loginApi, profileUpdateApi, getProfileInfoApi } from '../../data/actions/login-actions';
import { withRouter, Link } from 'react-router-dom';


class Profile extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getProfile()
    }
    update = (e) => {
        e.preventDefault()
        this.props.update({
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            city: this.city.value,
            postalcode: this.postalcode.value,
            phone: this.phone.value
        }, () => {
            this.props.getProfile()
            this.props.history.push("/")
        })
    }
    render() {
        const { status } = this.props
        const { firstname, lastname, city, postalcode, phone } = this.props.profile
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input defaultValue={firstname} type="text" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="firstname" ref={me => this.firstname = me} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input defaultValue={lastname} type="text" className="form-control" id="lastname" placeholder="lastname" ref={me => this.lastname = me} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input defaultValue={city} type="text" className="form-control" id="city" placeholder="city" ref={me => this.city = me} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalcode">Postal Code</label>
                        <input defaultValue={postalcode} type="text" className="form-control" id="postalcode" placeholder="postalcode" ref={me => this.postalcode = me} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input defaultValue={phone} type="text" className="form-control" id="phone" placeholder="phone" ref={me => this.phone = me} />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.update(e)} >Update</button>
                </form>
            </div>
        );
    }
}
const stp = (state, props) => {
    return {
        status: state.profile.request_status,
        profile: state.profile
    }
}
const atp = {
    update: profileUpdateApi,
    getProfile: getProfileInfoApi
}
export default connect(stp, atp)(Profile);