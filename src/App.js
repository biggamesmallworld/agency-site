import React, {Component} from 'react';
import PageWrapper from './components/PageWrapper';
import AdminWrapper from './components/AdminWrapper';
import LoginWrapper from './components/LoginWrapper';
import {
  BrowserRouter as Router,
  Route, Redirect
} from "react-router-dom";
import {connect} from 'react-redux';


//pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactForm from './components/pages/ContactForm';
import Login from './components/pages/Login';
import Blog from './components/pages/Blog';
import SingleBlog from './components/pages/SingleBlog';
import Signup from './components/pages/Signup';

//admin pages
import Dashboard from './components/pages/admin/Dashboard';
import Posts from './components/pages/admin/Posts';
import Users from './components/pages/admin/Users';
import AddPost from './components/pages/admin/AddPost';
 

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          exact={true}
          path="/admin/users"
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Users />  
                  </AdminWrapper>
                : 
                  <LoginWrapper>
                    <Login {...props} />
                  </LoginWrapper>
                }
              </div>
                
          )}}
        />
        <Route
          exact={true}
          path="/admin/posts/:view/:id"
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost />  
                  </AdminWrapper>
                : 
                  <LoginWrapper>
                    <Login {...props} />
                  </LoginWrapper>
                }
              </div>
                
          )}}
        />
        <Route
          exact={true}
          path="/admin/posts/:view"
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost />  
                  </AdminWrapper>
                : 
                  <LoginWrapper>
                    <Login {...props} />
                  </LoginWrapper>
                }
              </div>
                
          )}}
        />
        <Route
          exact={true}
          path="/admin/posts"
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Posts />  
                  </AdminWrapper>
                : 
                  <LoginWrapper>
                    <Login {...props} />
                  </LoginWrapper>
                }
              </div>
                
          )}}
        />
        <Route
          exact={true}
          path='/signup'
          render={props => {
            if(this.props.auth.token) {
              return (
                <Redirect to="/" />
              )
            } else {
              return (
                <LoginWrapper>
                  <Signup />
                </LoginWrapper>
              )
            }
            
          }}
        />
        <Route
          exact={true}
          path='/admin'
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Dashboard />  
                  </AdminWrapper>
                : 
                  <LoginWrapper>
                    <Login {...props} />
                  </LoginWrapper>
                }
              </div>
                
          )}}
        />
        <Route
          exact={true}
          path='/'
          render={props => (
            <PageWrapper>
              <Home {...props} />
            </PageWrapper>
          )}
        />
        <Route
          exact={true}
          path='/blog/:slug'
          render={props => (
            <PageWrapper>
              <SingleBlog {...props} />
            </PageWrapper>
          )}
        /> 
        <Route
          exact={true}
          path='/blog'
          render={props => (
            <PageWrapper>
              <Blog {...props} />
            </PageWrapper>
          )}
        /> 
        <Route
          exact={true}
          path='/about'
          render={props => (
            <PageWrapper>
              <About {...props} />
            </PageWrapper>
          )}
        />  
        <Route
          exact={true}
          path='/contact'
          render={props => (
            <PageWrapper>
              <ContactForm {...props} />
            </PageWrapper>
          )}
        /> 
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
