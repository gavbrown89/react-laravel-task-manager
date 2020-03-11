import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import Header from './components/header';
import SignIn from './components/signIn';
import RegisterAccount from './components/register';
import TaskList from './components/taskList';
import NewTask from './components/createTask';
import SingleTask from './components/singleTask';

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducer);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
            <Header />     
            <Switch>
              <Route exact path='/' component={SignIn} />  
              <Route path='/register' component={RegisterAccount} />                        
              <Route path='/tasks' component={TaskList} />
              <Route path='/create' component={NewTask} />
              <Route path='/:id' component={SingleTask} />    
            </Switch>      
        </Router>
      </Provider>
    )
  }
}

export default App;