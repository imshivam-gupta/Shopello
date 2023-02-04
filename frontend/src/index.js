import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//^ IMPORTING THE DOWNLOADED BOOTSTRAP CSS AND EXTERNAL STYLESHEET FOR PAGE
import './bootstrap.min.css';
import './index.css';

//^ Using the browser router to use for same page rendering
import { BrowserRouter} from 'react-router-dom'

//^ Importing the useful componets for redux
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

