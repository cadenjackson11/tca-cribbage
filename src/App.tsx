import React from 'react';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import {Home} from './Home';
import {Setup} from './Setup';
import {Play} from './Play';

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />
    },

    {
      path: "/setup",
      element: <Setup />

    },

    {
      path: "/play",
      element: <Play />
    },
  ]
);


const App = () => {
  return (
    <div className="App p-3 ">





      <RouterProvider 
        router={router}
      />
    </div>
    
  
  
    
  );
}

export default App;
