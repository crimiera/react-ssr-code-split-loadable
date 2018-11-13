import React, { Component } from 'react'
import { create } from 'domain';





const loadComponent = (component,url) => {
  
  let res = null;

  function preload() {
    if (!res) {
        res = loadFn(opts.loader);
    }
    console.log("called init")
    return res.promise;
  }


  return class DynamicImport extends Component {
    
    constructor(props){
      super(props);

      this.state = {
        component: null,
        loader:false
      }
    }

    static preload() {
      console.log(url)
    }

    componentDidMount () {
      component.load().then(component => {
        this.setState({component: component.default});
      });
    }

    render() {
      const C = this.state.component;
      return C ?
       React.createElement(C, this.props)  
      /* <C {...this.props} /> */
       : 
       null;
    }
  } 
}


// loader == () => import(XXX) 
// return loaded component() || state.loaded = loaded; 
function load(loader) {
  let promise = loader();

  let state = {
    loading: true,
    loaded: null,
    error: null
  };

  state.promise = promise
    .then(loaded => {
      state.loading = false;
      state.loaded = loaded;
      return loaded;
    })
    .catch(err => {
      state.loading = false;
      state.error = err;
      throw err;
    });

  return state;
}

const AsyncLoading = (options) => {
  return loadComponent(options.load);
}


export default AsyncLoading;

 