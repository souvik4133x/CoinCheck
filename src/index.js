import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {  ColorModeScript,ChakraProvider, theme } from "@chakra-ui/react";
import ColorModeSwitcher from './ColorModeSwitcher';
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const  customThem = extendTheme({ config })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <ColorModeScript  initialColorMode="dark"/>
  <ChakraProvider theme={customThem}>
  <ColorModeSwitcher />
    <App />
  </ChakraProvider>
</React.StrictMode>
);





export const server =`https://api.coingecko.com/api/v3`;
