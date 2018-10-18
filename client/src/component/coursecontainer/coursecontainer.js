import React, { Component } from 'react';
import { connect } from 'react-redux'
import './coursecontainer.css';
import Loader from '../loader/loader';
import { getCoursesApi } from '../../data/actions/login-actions';
import Course from '../course/course';




class CourseContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getCourses()

    }
    render() {
        const { status, courses } = this.props
        return (
            <div>
                <Loader loading={status} />                
                {
                    courses.map((group, g) => { return [    
                        <div key={g}>Group</div>,
                    group.gl.map((course, i) => <Course {...course} key={`group${i}`}/>)
                    ]})
                }
            </div>
        );
    }
}
const stp = (state, props) => {
    return {
        status: state.profile.request_status,
        courses: state.profile.courses        
    }
}
const atp = {
    getCourses: getCoursesApi
}
export default connect(stp, atp)(CourseContainer);
