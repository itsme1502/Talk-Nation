import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider';
import axios from 'axios';

axios.defaults.baseURL = "https://talk-nation.onrender.com"
axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <ChatProvider>
     <ChakraProvider>
      <App />
     </ChakraProvider>
     </ChatProvider>
     </BrowserRouter>
);

