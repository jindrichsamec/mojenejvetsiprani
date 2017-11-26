import React from 'react';
import { List, ListItem, Avatar } from 'material-ui';
import {Link} from 'react-router-dom'


export default function Users({users}) {

  return (
    <List>
      {users.map((user, key) => {
        const avatar = <Avatar>{user.name.substr(0, 1)}</Avatar>
        return (
          <Link to={`/${user.id}`} key={`user-${key}`}>
            <ListItem leftAvatar={avatar}>{user.name}</ListItem>
          </Link>
        );
      })}
    </List>
  );

}
