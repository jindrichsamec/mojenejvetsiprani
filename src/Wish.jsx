import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function Wish({ name, wish, showCheckbox}) {
  const props = {
    primaryText: wish,
    secondaryText: `Přeje si ${name}`,
    leftCheckbox: showCheckbox ? <Checkbox /> : null
  }
  return (
    <ListItem {...props} />
  );
}
