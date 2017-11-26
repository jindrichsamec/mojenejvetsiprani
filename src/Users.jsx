import React from 'react';
import { List, ListItem, Avatar } from 'material-ui';


export default function Users({users}) {

  return (
    <List>
      {users.map(user => {
        const avatar = <Avatar>{user.name.substr(0, 1)}</Avatar>
        return (
          <ListItem leftAvatar={avatar}>{user.name}</ListItem>
        );
      })}
    </List>
  );

}
