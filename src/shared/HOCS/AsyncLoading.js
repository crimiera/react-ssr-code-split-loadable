import React, { Component } from 'react'
import { create } from 'domain';


const COMPONENTS = [
  /**
   *  { path :  }
   */
];  

const AsyncLoading = (LoadComponent,opt) => {

    createComponent(LoadComponent,opt);
}

const createComponent  =  (comp,option) => {
  
  return class DynamicImport extends Component {
    
    constructor(props){
      super(props);

      this.state = {
        component: null,
        loader:false
      }
    }

    componentDidMount () {
      comp().then(component => {
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

 