import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./course.css"
import { withRouter } from 'react-router-dom';

class Course extends Component {
    constructor(props) {
        super(props)
    }
    setCourse(e, course){
        e.preventDefault()
        localStorage.setItem("targetCourse", JSON.stringify(course))
        this.props.history.push("/profile/locations")
    }
    render() {
        const { title, description, lecturer, date } = this.props
        return (<div>
            <div className="card border-primary mb-3" style={{ width: "60rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
                    <p className="card-text">{lecturer}</p>
                    <p className="card-text">{date}</p>
                    <button className="btn btn-success" onClick={ (e) => this.setCourse(e, this.props)}>Guide Me</button>
                </div>
            </div>
        </div>)
    }
}



// const Course = ({ title, description, lecturer, date, venue }) => (
//     <div>
//         <div className="card border-primary mb-3" style= {{width: "60rem"}}>
//             <div className="card-body">
//                 <h5 className="card-title">{title}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
//                 <p className="card-text">{lecturer}</p>
//                 <p className="card-text">{date}</p>
//                 <a href="#" className="card-link">Guide Me</a>
//             </div>
//         </div>
//     </div>
// )




export default withRouter(Course)

