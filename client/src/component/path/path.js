import React, { Component } from 'react';
import { connect } from 'react-redux'
import './path.css';
import Loader from '../loader/loader';
import axios from 'axios';
import { TOTAL_PATH } from '../../utility/endpoints';

import '../location/location.css';





class Path extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path: [],
            status: false,
            selectedCourse: {}
        }
    }


    init = (e) => {
        e.preventDefault()
        this.setState({
            status: true,
            path: []
        }, () => {
            const destination = "000703657"
            const source = localStorage.getItem("SourceId")
            axios.get(`${TOTAL_PATH}?s=${source}&d=${destination}`)
                .then(data => {

                    console.log(data.data)
                    this.setState({
                        status: false,
                        path: data.data.data
                    })

                })
                .catch(error => {

                    this.setState({
                        state: false
                    })
                    console.log(error)
                })
        })

    }

    // componentDidMount() {        
    //     this.props.history.listen((location, action) => {
    //         if(location.pathname === "/profile/locations/path"){
    //             console.log(action)
    //             this.init()
    //         }
    //     });
    // }
    componentDidMount() {
        const course = localStorage.getItem("targetCourse")
        if (course) {
            this.setState({
                selectedCourse: JSON.parse(course)
            })
        }
    }
    render() {
        const { path, status, selectedCourse } = this.state

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
                        <button className="btn btn-lg btn-warning btn-block" onClick={(e) => this.init(e)} >Get directions</button>
                    </div>
                </div>



                <div className="container m-4">
                    <div className="row justify-content-md-center">

                        {
                            path.map((n, index) =>
                                <div key={index} className="card border-primary mb-3" style={{ width: "60rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Origin Station: {n.origin}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Destination Station: {n.destination}</h6>
                                        <p className="card-text">{(n.mode) ? n.mode: ""}</p>
                                        <p className="card-text">{(n.distance) ? n.distance+ " m": ""}</p>
                                        <p className="card-text">{n.departureTime}</p>
                                        <p className="card-text">{n.arrivalTime}</p>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>




            </div>
        );
    }
}

export default Path;
