import React, { Component } from 'react';
import { connect } from 'react-redux'
import './location.css';
import Loader from '../loader/loader';
import { resetLocations, getLocationApi } from '../../data/actions/login-actions';
import axios from 'axios';
import { SEARCH_PATH } from '../../utility/endpoints';



class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitue: 0.0,
            longitude: 0.0,
            selectedCourse: {},
            stations: []
        }
    }
    init = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.getLocation(position.coords.latitude, position.coords.longitude)
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, (error) => { console.log(error) }, {
                timeout: 10000,
                enableHighAccuracy: false,
                maximumAge: 5
            });
    }
    componentDidMount() {
        this.props.resetLocations()
        const course = localStorage.getItem("targetCourse")
        if (course) {
            this.setState({
                selectedCourse: JSON.parse(course)
            })
        }
        //this.init()
    }
    setLocation = (e) => {
        e.preventDefault()
        this.init()
        // this.props.login(this.email.value, this.password.value, () => {
        //   this.props.history.push("/")
        // })
    }
    setStation(e, id) {
        e.preventDefault()
        localStorage.setItem("SourceId", id)
        this.props.history.push("/profile/locations/path")
    }
    search = (e) => {
        e.preventDefault()
        this.props.resetLocations()
        this.setState({
            stations: []
        }, () => {
            axios.get(`${SEARCH_PATH}?location=${this.station.value}`)
                .then(data => {         
                    console.log(data.data.data)           
                    this.setState({
                        stations: data.data.data
                    })
                })
        })
    }
    render() {
        const { status, locations } = this.props
        const { selectedCourse, stations } = this.state
        return (
            <div className="text-center">
                <Loader loading={status} />




                <div className="container m-4">
                    <div className="row justify-content-md-center">
                        <div className="card border-primary mb-3" style={{ width: "60rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{selectedCourse.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{selectedCourse.description}</h6>
                                <p className="card-text">{selectedCourse.lecturer}</p>
                                <p className="card-text">{selectedCourse.date}</p>
                            </div>
                        </div>
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4"><button className="btn btn-lg btn-secondary btn-block" onClick={(e) => this.setLocation(e)} >Get near Bus Stations</button></div>
                    </div>



                    <div className="container m-4">
                        <div className="row justify-content-md-center">

                            <div className="row">

                                <form className="form-inline">
                                    <div className="form-group mb-2">
                                        <label for="staticEmail2" className="sr-only">Email</label>
                                        <input type="text" readonly className="form-control-plaintext" id="staticEmail2" value="e.g. Kiel Hbf" />
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label for="inputPassword2" className="sr-only">Station name</label>
                                        <input type="text" className="form-control" id="inputPassword2" placeholder="station name" ref={me => this.station = me} />
                                    </div>
                                    <button type="" className="btn btn-primary mb-2" onClick={e => { this.search(e) }}>Search</button>
                                </form>





                            </div>



                        </div>
                    </div>


                    <div className="container m-4">
                        {
                            locations.map((location, index) =>
                                <div key={index} className="card border-primary mb-3" style={{ width: "60rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{location.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Distance: {location.distance}</h6>
                                        <p className="card-text">Bus Stop</p>
                                        <p className="card-text">Your Coordinate | Latitue: {this.state.latitude} - Longitude: {this.state.longitude}</p>
                                        <button className="btn btn-lg btn-success btn-block" onClick={(e) => this.setStation(e, location.id)} >Start From This Station</button>
                                    </div>
                                </div>)
                        }
                    </div>

                    <div className="container m-4">
                        {
                            stations.map((station, index) =>
                                <div key={index} className="card border-primary mb-3" style={{ width: "60rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{station.name}</h5>                                        
                                        <p className="card-text">Bus Stop</p>
                                        <button className="btn btn-lg btn-success btn-block" onClick={(e) => this.setStation(e, station.id)} >Start From This Station</button>
                                    </div>
                                </div>)
                        }
                    </div>



                </div>


                {/* <Link className="btn btn-lg btn-primary btn-block" to={"/register"} activeclassname="active">Register</Link> */}


            </div>
        );
    }
}
const stp = (state, props) => {
    return {
        locations: state.profile.locations
    }
}
const atp = {
    resetLocations: resetLocations,
    getLocation: getLocationApi
}
export default connect(stp, atp)(Location);
