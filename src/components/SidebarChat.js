import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from '../firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({ addNewChat, id, name }) => {
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
    setImage(Math.random() * 2);
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }
  }, [id]);

  const newChat = () => {
    const chatName = prompt('Enter your name');
    if (chatName) {
      db.collection('chats').add({
        name: chatName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/chats/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${image}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={newChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
//https://avatars.dicebear.com/api/human/2.svg
