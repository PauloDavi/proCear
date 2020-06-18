import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Routes from '~/routes';
import history from '~/services/history';
import { store, persistor } from '~/store';
import GlobalStyle from '~/styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
