import React from 'react';
import { Web3ContextProvider } from './Context/Web3Context';
import { GlobalVariablesContextProvider } from './Context/GlobalVariablesContext';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './Pages/Home';
// import Voting from './Pages/Voting';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/styles.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Web3ContextProvider>
          <GlobalVariablesContextProvider>
            <div className='App'>
              <Route exact path='/' component={Home} />
            </div>
          </GlobalVariablesContextProvider>
        </Web3ContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
