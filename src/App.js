import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Users from './Users';
import WishList from './WishList';

const USERS = [
  {id: 1, name: 'Klárka'},
  {id: 2, name: 'Majda'},
  {id: 3, name: 'Mami'},
  {id: 4, name: 'Marti'},
  {id: 5, name: 'Terka'},
];

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <AppBar title="Moje nejvetší přání" />
          <Users users={USERS} />
          <WishList />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default App;
