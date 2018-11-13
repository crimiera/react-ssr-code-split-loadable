import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'
import Page from './Page';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log("constructor called SERVER/CLIENT ");
  }

  static init(){
    console.log("render");
  }
  static getDerivedStateFromProps(props, state){
    console.log("getDerivedStateFromProps called SERVER/CLIENT")
    return null;
  }
  componentDidMount(){
    console.log("componentDidMount called CLIENT-HYDRATION")
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log("componentDidUpdate called ")
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log("getSnapshotBeforeUpdate called ")
    return null;
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("shouldComponentUpdate called ")
    return true;
  }

  componentDidCatch(error, info){
    console.log("componentDidCatch called ")
    /**
     * Error boundaries only catch errors in the components below them in the tree.
     * An error boundary can’t catch an error within itself.
     */
  }

  render() {
    console.log("render called SERVER/CLIENT")
    return (
      <div>
        <Page>
          <Navbar />
          <Switch>
            {routes.map(({ path, exact, component: Component, ...rest }) => (
              <Route me={"shlomi"} key={path} path={path} exact={exact} render={(props) => (
                <Component {...props} {...rest} />
              )} {...rest} />
            ))}
            <Route render={(props) => <NoMatch {...props} /> } />
          </Switch>
        </Page>
        
      </div>
    )
  }
}

export default App