import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';

import socketIo from 'socket.io-client';

import Wish from './Wish';

const ENTER_KEY_CODE = 13

export class WishList extends Component {

  socket;

  input;

  get myWishes() {
    return this.wishes.filter(w => w.createdBy.id === this.props.currentUser.id)
  }


  get otherWhishes() {
    return this.wishes.filter(w => w.createdBy.id !== this.props.currentUser.id)
  }

  constructor(props) {
    super(props);

    this.form = observable({
      currentWish: ''
    });

    this.wishes = observable.array([]);
  }

  componentDidMount() {
    this.socket = socketIo(process.env.REACT_APP_SOCKET_IO_HOST)
    this.socket.on('WISH_LIST', (data) => {
      this.wishes.replace(data);
    });

    this.socket.on('WISH_ADDED', (data) =>  {
      this.wishes.unshift(data);
    });

    this.socket.on('WISH_REMOVED', (data) => {
      this.wishes.remove(data);
    })

    this.socket.on('WISH_UPDATED', (data) => {
      const index = this.wishes.findIndex(w => w.id === data.id)
      this.wishes[index] = data
    })
    this.input.focus();
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
    const index = this.wishes.findIndex(w => w.id === wish.id)
    this.wishes[index].selectedBy = selected ? this.props.currentUser : null;
    this.socket.emit('WISH_UPDATED', this.wishes[index]);
  }

  handleSubmit = (e) => {
    const wish = {
      id: uuid(),
      selectedBy: null,
      createdBy: this.props.currentUser,
      title: this.form.currentWish,
    }

    this.socket.emit('WISH_ADDED', wish);
    this.wishes.unshift(wish);

    this.form.currentWish = '';
  }

  getWishesFor = (user) => {
    return this.otherWhishes.filter(wish => wish.createdBy.id === user.id)
  }

  renderListForUser(user, currentUser) {
    if (currentUser.id === user.id) {
      return null;
    }
    return (
      <div>
        <Divider />
        <Subheader>{`Co si přeje ${user.name}`}</Subheader>
        {this.getWishesFor(user).map((wish, key) => <Wish wish={wish} currentUser={currentUser} onSelect={this.handleSelectWish} key={`other-${key}`} />)}
      </div>
    );
  }

  render() {
    const { currentUser, users } = this.props;

    return (
      <List>
      <Subheader>{`Moje přání`}</Subheader>
        <ListItem>

          <TextField hintText="Copak si přeješ? :)"
            value={this.form.currentWish}
            ref={input => this.input = input}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange} />
          <RaisedButton label="+" primary onClick={this.handleSubmit} />
        </ListItem>
        {this.myWishes.map((wish, key) => <Wish wish={wish} key={`my-${key}`} currentUser={currentUser} />)}
        {users.map(user => this.renderListForUser(user, currentUser))}
      </List>
    )
  }
}

export default observer(WishList);
