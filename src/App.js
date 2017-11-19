import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { List } from 'material-ui/List';
import { Card } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Wish from './Wish';

const ENTER_KEY_CODE = 13
class App extends Component {

  constructor(props) {
    super(props);

    this.form = observable({
      currentWish: ''
    });
    this.myWishes = observable.array([]);
    this.name = 'Jindra';

    this.wishes = [
      { name: "Majda", wish: 'deštník' },
      { name: "Martinka", wish: 'iPhone' },
      { name: "Mami", wish: 'klid' }
    ];
  }

  handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleSubmit();
    }
  }

  handleChange = (e) => {
    this.form.currentWish = e.target.value;
  }

  handleSubmit = (e) => {
    this.myWishes.push({
      name: this.name,
      wish: this.form.currentWish
    });
    this.form.currentWish = '';
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <AppBar title="Moje nejvetší přání" />
          <List>
            {this.wishes.map(props => <Wish {...props} showCheckbox/>)}
            <Divider />
            <Subheader>Moje přání</Subheader>
            {this.myWishes.map(props => <Wish {...props} />)}
            <TextField hintText="Copak si přeješ? :)"
              value={this.form.currentWish}
              onKeyUp={this.handleKeyUp}
              onChange={this.handleChange} />
            <RaisedButton label="Přidat" primary onClick={this.handleSubmit} />
          </List>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default observer(App);
