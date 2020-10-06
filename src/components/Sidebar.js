import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [{ user }, dispatch] = useStateValue();
  console.log(chats);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      setChats(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input
            type="text"
            value={search}
            placeholder="Search or start new chat"
            onChange={onSearchChange}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {chats
          .filter(chat => {
            return chat.data.name.toLowerCase().includes(search.toLowerCase());
          })
          .map(chat => {
            return (
              <SidebarChat id={chat.id} name={chat.data.name} key={chat.id} />
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
/*
id={chat.id}
              name={chat.data.name}
              key={chat.id}
*/
