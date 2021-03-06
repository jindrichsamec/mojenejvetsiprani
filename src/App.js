import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Users from './Users';
import WishList from './WishList';

const USERS = [
  {id: 1, name: 'Klárka'},
  {id: 2, name: 'Majda'},
  {id: 3, name: 'Mami'},
  {id: 4, name: 'Martinka'},
  {id: 5, name: 'Terka'},
];

class App extends Component {

  render() {
    return (
      <HashRouter>
        <MuiThemeProvider>
          <Card>
            <AppBar title="Moje nejvetší přání" showMenuIconButton={false} />
            <Switch>
              <Route path="/" exact render={() => <Users users={USERS} />} />
              <Route path="/:userId" render={(props) => {
                const user = USERS.find(u => u.id === parseInt(props.match.params.userId, 10))
                return <WishList currentUser={user} users={USERS} />;
              }}/>
            </Switch>
          </Card>
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}

export default App;
