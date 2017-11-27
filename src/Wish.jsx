import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import StarIcon from 'material-ui/svg-icons/action/grade';

export class Wish extends Component {

  _state = observable({
    checked: false
  })

  componentWillMount() {
    const { wish } = this.props;
    this._state.checked = this.isSelected(wish)
  }

  componentDidUpdate(props, nextProps) {
    const { wish } = this.props;
    this._state.checked = this.isSelected(wish)
  }

  handleCheck = (e, isInputChecked) => {
    this._state.checked = isInputChecked;
    this.props.onSelect(isInputChecked, this.props.wish)
  }

  isItForCurrentUser = (wish, user) => {
    return wish.createdBy && wish.createdBy.id === user.id;
  }

  isSelectedByCurrentUser = (wish, user) => {
    return wish.selectedBy && wish.selectedBy.id === user.id;
  }

  isSelected = (wish) => {
    return !!wish.selectedBy
  }

  isDisabled = (wish, user) => {
    return (this.isSelected(wish) && !this.isSelectedByCurrentUser(wish, user))
  }

  render() {
    const { wish, currentUser } = this.props;
    const props = {primaryText:  wish.title}

    if (!this.isItForCurrentUser(wish, currentUser)) {
      props['leftCheckbox'] = <Checkbox
        disabled={this.isDisabled(wish, currentUser)}
        checked={this._state.checked}
        onCheck={this.handleCheck}/>
    } else {
      props['leftIcon'] = <StarIcon />
    }

    return (
      <ListItem {...props}  />
    );
  }

}

export default observer(Wish);
