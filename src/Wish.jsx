import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function Wish({ createdBy, wish, selected, showCheckbox, onSelect}) {

  const props = {
    primaryText: (selected ? <s>{wish}</s> : wish),
    secondaryText: (selected ? <s>{`Přeje si ${createdBy.name}`}</s> : `Přeje si ${createdBy.name}`),
    leftCheckbox: showCheckbox ? <Checkbox onCheck={(e, isInputChecked) => onSelect(isInputChecked, { wish })}/> : null
  }

  return (
    <ListItem {...props}  />
  );
}
