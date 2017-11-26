import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function Wish({ name, wish, selected, showCheckbox, onSelect}) {

  const props = {
    primaryText: (selected ? <s>{wish}</s> : wish),
    secondaryText: (selected ? <s>{`Přeje si ${ name }`}</s> : `Přeje si ${name}`),
    leftCheckbox: showCheckbox ? <Checkbox onCheck={(e, isInputChecked) => onSelect(isInputChecked, { wish, name })}/> : null
  }

  return (
    <ListItem {...props}  />
  );
}
