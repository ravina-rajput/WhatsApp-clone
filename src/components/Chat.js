import React, { useState, useEffect } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [{ user }, dispatch] = useStateValue();
  const { chatId } = useParams();
  const [chatName, setChatName] = useState('');
  const [messages, setMessages] = useState([]);

  const onFormSubmit = event => {
    event.preventDefault();
    db.collection('chats').doc(chatId).collection('messages').add({
      name: user.displayName,
      message: userInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setUserInput('');
  };

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .onSnapshot(snapshot => {
          setChatName(snapshot.data().name);
        });
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{chatName}</h3>
          <p>
            last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => {
          return (
            <p
              className={`chat__message ${
                message.name === user.displayName && `chat__reciever`
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__time">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <SentimentVerySatisfiedIcon />
        <AttachFileIcon />
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="type your message here"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
