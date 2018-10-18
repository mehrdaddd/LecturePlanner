import React, { Component } from 'react';
import { connect } from 'react-redux'
import Loader from '../loader/loader';



class Home extends Component {
  componentDidMount() {
  }

  
  render() {
    return (
      <div className="">

        <main role="main">


          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Lecture Planner!</h1>
              <p>This website is provided students of Kiel University with ...</p>
              <p><a className="btn btn-primary btn-lg" href="#" role="button" disabled>Learn more &raquo;</a></p>
            </div>
          </div>

          <div className="container">

            <div className="row">
              <div className="col-md-4">
                <h2>Browse Lectures</h2>                
                <p>You can see all the lectures being pffered by CAU University</p>
                {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
              </div>
              <div className="col-md-4">
                <h2>Best Route! FTW</h2>
                <p>This application is able to find the best bus route for you to attend your class as soon as you cant even imagine it!</p>
                {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
              </div>
              <div className="col-md-4">
                <h2>Manage profile</h2>
                <p>OH, what a briliant feature, yes you can edit your profile as well</p>
                {/* <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
              </div>
            </div>
            
          </div>

        </main>
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
export default connect(stp, atp)(Home);
