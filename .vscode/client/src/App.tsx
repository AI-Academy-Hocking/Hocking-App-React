import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CalendarPage from './pages/Calendar';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
    </Router>
  );
};

export default App;