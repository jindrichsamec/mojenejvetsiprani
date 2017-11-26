import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function Wish({ wish, showCheckbox, onSelect}) {

  const props = {
    primaryText: (wish.selectedBy ? <s>{wish.title}</s> : wish.title),
    secondaryText: (wish.selectedBy ? <s>{`Přeje si ${wish.createdBy.name}`}</s> : `Přeje si ${wish.createdBy.name}`),
    leftCheckbox: showCheckbox ? <Checkbox onCheck={(e, isInputChecked) => onSelect(isInputChecked, wish)}/> : null
  }

  return (
    <ListItem {...props}  />
  );
}
