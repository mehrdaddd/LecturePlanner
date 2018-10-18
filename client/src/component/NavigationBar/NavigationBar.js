import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



class NavigationBar extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <span className="navbar-brand" href="#">Lecture Sucher</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <Link className="nav-link" to={"/profile"}>Profile</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/profile/courses"}>Courses</Link>
                            </li>
                            
                            
                            
                        </ul>
                    </div>
                </nav>
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
}
export default connect(stp, atp)(NavigationBar);
