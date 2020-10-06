import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import LogIn from './components/LogIn';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/chats/:chatId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        ) : (
          <LogIn />
        )}
      </div>
    </div>
  );
};

export default App;
