import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import './App.css';
import Users from './Pages/Users';
import Roles from './Pages/Roles';
import Permissions from './Pages/Permissions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersObj: null,
      userFilteredObj: null,
      rolesObj: null,
      permissionsObj: null,
      pageNumber: 1,
      searchInput: null,
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getRoles();
    this.getPermissions();
  }

  pageSelector = (event, data) => {
    event.preventDefault();
    this.setState({ pageNumber: data.activePage });
  };

  searchUserName = (e) => {
    let inputchar = e.target.value.toLowerCase().trim();
    this.setState({
      searchInput: inputchar,
    });
    // console.log('Input word for search', inputchar);
  };

  getSearchResult = (e) => {
    if (!!this.state.usersObj && !!this.state.searchInput) {
      // console.log('input for search by button-click: ', this.state.searchInput);

      const userFilteredResult = this.state.usersObj.filter((item) =>
        item.username.toLowerCase().includes(this.state.searchInput)
      );
      // console.log('userFilteredResult is', userFilteredResult);

      if (userFilteredResult.length === 0) {
        alert('Cannot find the input User_Name! Please try to input again.');
      } else {
        this.setState({ userFilteredObj: userFilteredResult });
      }
    }
  };

  render() {
    const { usersObj, userFilteredObj, rolesObj, permissionsObj } = this.state;
    // console.log('userFilteredObj = ', userFilteredObj);

    if (usersObj && rolesObj && permissionsObj) {
      return (
        <Router className="GRole-all">
          <section className="left-img">
            <img
              src={require('./GenHub_img_navbar.jpg')}
              alt="VA GenHub NavBar"
            />
          </section>

          <section className="main-body">
            <div className="header-line-settings">
              <h1 className="users-icon">
                {' '}
                <Icon name="users" size="large" /> GRole - Manage Genisis Access{' '}
              </h1>

              <nav className="Nav-style">
                <div>
                  <Link to="/grole" id="Nav-tab">
                    Users-Info
                  </Link>
                  <Link id="Nav-tab"></Link>
                  <Link to="/grole/roles" id="Nav-tab">
                    {' '}
                    Roles-Users
                  </Link>
                  <Link id="Nav-tab">|</Link>
                  <Link to="/grole/privileges" id="Nav-tab">
                    {' '}
                    Permissions
                  </Link>
                </div>
              </nav>
            </div>

            <Switch>
              <Route
                path="/grole"
                exact
                render={(props) => (
                  <Users
                    searchUserName={this.searchUserName}
                    getSearchResult={this.getSearchResult}
                    usersObj={
                      !!this.state.searchInput && !!userFilteredObj
                        ? userFilteredObj
                        : usersObj
                    }
                    pageSelector={this.pageSelector}
                    pageNumber={this.state.pageNumber}
                    {...props}
                  />
                )}
              />
              <Route
                path="/grole/roles"
                render={(props) => (
                  <Roles
                    rolesObj={rolesObj}
                    pageSelector={this.pageSelector}
                    pageNumber={this.state.pageNumber}
                    {...props}
                  />
                )}
              />
              <Route
                path="/grole/privileges"
                render={(props) => (
                  <Permissions
                    permissionsObj={permissionsObj}
                    pageSelector={this.pageSelector}
                    pageNumber={this.state.pageNumber}
                    {...props}
                  />
                )}
              />
            </Switch>
          </section>
        </Router>
      );
    } else {
      return <div> </div>;
    }
  }

  getUsers() {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => response.json())
      .then((allusers) => {
        this.setState({
          usersObj: allusers.all_users,
        });
        // console.log('Loaded - all Users: ', this.state.usersObj);
      });
  }

  getRoles() {
    fetch(`${process.env.REACT_APP_API_URL}/roles`)
      .then((response) => response.json())
      .then((allroles) => {
        this.setState({
          rolesObj: allroles.all_roles,
        });
        // console.log('Loaded - all Roles: ', this.state.rolesObj);
      });
  }
  getPermissions() {
    fetch(`${process.env.REACT_APP_API_URL}/privileges`)
      .then((response) => response.json())
      .then((allpermissions) => {
        this.setState({
          permissionsObj: allpermissions.all_privileges,
        });
        // console.log('Loaded - all Permissions: ', this.state.permissionsObj);
      });
  }
}

export default App;
