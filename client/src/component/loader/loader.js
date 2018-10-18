import React from 'react'
import PropTypes from 'prop-types'
import "./loader.css"


const Loader = ({ loading }) => (
  <div style={{ display: (loading ? 'block' : 'None') }} className="overlay">    
      <div className="center loader"></div>    
  </div>
)

Loader.propTypes = {
  loading: PropTypes.bool
}





export default Loader

