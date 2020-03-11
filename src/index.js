
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TransactionsContainer from './containers/TransactionsContainer';
import TransactionDetails from './components/TransactionDetails'
import { Provider as AppContextProvider } from './context/AppContext'

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Route exact path="/" component={TransactionsContainer} />
        <Route exact path="/:iban" component={TransactionDetails} />
      </Router>
    </AppContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));