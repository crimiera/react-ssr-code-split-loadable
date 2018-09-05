import React, {Component} from 'react'

class Contact extends Component   {
  
  constructor(props) {
    super(props);

    console.log(" constructor called ")
  }

  componentDidMount(){
    console.log(" componentDidMount called ")
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log("componentDidUpdate called ")
  }
  
  render(){
    console.log("Render called ")
    return (
      <div>
      Contact component 
      </div>
    )
  }
}

export default Contact;