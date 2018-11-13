import React from 'react'

import {Link } from 'react-router-dom'

class Page extends React.Component {

  render (){

    return (
        <div className="row page">
          <div className="col">
            {this.props.children}
          </div>
        </div>
    )
  }
}


export default Page