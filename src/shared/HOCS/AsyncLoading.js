import React, { Component } from 'react'


const AsyncLoading = (LoadComponent) => {
  

   class DynamicImport extends Component {
    
    constructor(props){
      super(props);

      this.state = {
        component: null,
        loader:false
      }
    }

    componentDidMount () {

      LoadComponent().then(component => {
        this.setState({component: component.default});
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return DynamicImport
   
}

export default AsyncLoading;

 