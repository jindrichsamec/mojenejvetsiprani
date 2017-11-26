import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';

import { observable } from 'mobx';
import { observer } from 'mobx-react';


import socketIo from 'socket.io-client';

import Wish from './Wish';

const ENTER_KEY_CODE = 13


export class WishList extends Component {

  socket;

  constructor(props) {
    super(props);

    this.form = observable({
      currentWish: ''
    });

    this.name = 'Jindra';
    this.myWishes = observable.array([]);
    this.wishes = observable.array([]);
  }

  componentDidMount() {
    this.socket = socketIo('//localhost:5000')
    this.socket.on('WISH_LIST', (data) => {
      this.wishes.replace(data);
    });

    this.socket.on('WISH_ADDED', (data) =>  {
      this.wishes.push(data);
    });

    this.socket.on('WISH_REMOVED', (data) => {
      this.wishes.remove(data);
    })

    this.socket.on('WISH_UPDATED', (data) => {
      const index = this.wishes.findIndex(w => w.wish === data.wish)
      this.wishes[index] = data
    })
  }

  handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleSubmit();
    }
  }

  handleChange = (e) => {
    this.form.currentWish = e.target.value;
  }

  handleSelectWish = (selected, wish) => {
    wish.selected = selected;
    this.socket.emit('WISH_UPDATED', wish);
  }

  handleSubmit = (e) => {
    const wish = {
      name: this.name,
      wish: this.form.currentWish,
    }

    this.socket.emit('WISH_ADDED', wish);
    this.myWishes.push(wish);

    this.form.currentWish = '';
  }

  render() {
    return (
      <List>
        {this.wishes.map(props => <Wish {...props} showCheckbox onSelect={this.handleSelectWish} />)}
        <Divider />
        <Subheader>Moje přání</Subheader>
        {this.myWishes.map(props => <Wish {...props} />)}
        <TextField hintText="Copak si přeješ? :)"
          value={this.form.currentWish}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange} />
        <RaisedButton label="Přidat" primary onClick={this.handleSubmit} />
      </List>
    )
  }
}

export default observer(WishList);
