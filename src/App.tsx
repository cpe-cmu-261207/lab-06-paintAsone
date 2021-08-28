import React from 'react';
import Navbar from './components/Navbar';
import Current from './components/Current';
import Select from './components/Select';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Result from './components/Result';


function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact>
          <Current/>
        </Route>
        <Route path="/current">
          <Current/>
        </Route>

        <Route path="/history/select">
          <Select/>
        </Route>

        <Route path="/history/result">
          <Result/>
        </Route>

        <Route path='/about'>
          {/* template for about me */}
          <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>About me</p>
            <p className='text-xl'>Natkamonlak Intaramanon 630610728</p>
          </div>
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
