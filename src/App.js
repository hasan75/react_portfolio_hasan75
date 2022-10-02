import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { ThemeContext } from './contexts/ThemeContext';
import { Main, BlogPage, ProjectPage } from './pages'
import { BackToTop } from './components'
import ScrollToTop from './utils/ScrollToTop'
import MessengerCustomerChat from 'react-messenger-customer-chat';

import './App.css'
import SingleProjectPage from './pages/Project/SingleProjectPage/SingleProjectPage';

function App() {

  const { theme } = useContext(ThemeContext);

  console.log("%cDEVELOPER PORTFOLIO", `color:${theme.primary}; font-size:50px`);
  console.log("%chttps://github.com/hhhrrrttt222111/developer-portfolio", `color:${theme.tertiary}; font-size:20px`);
  // console.log = console.warn = console.error = () => {};

  return (
    <div className="app">
      <Router>
        <ScrollToTop/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/blog" exact component={BlogPage} />
          <Route path="/projects" exact component={ProjectPage} />
          <Route path="/projects/:id" exact component={SingleProjectPage} />

          <Redirect to="/" />
        </Switch>
      </Router>
      <MessengerCustomerChat
        pageId="110934641046644"
        appId="903476450557451"
      />
      <BackToTop />
    </div>
  );
}

export default App;
