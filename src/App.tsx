import React from 'react';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <div>Home</div>
    },

    {
      path: "/setup",
      element: <div>Setup</div>

    },

    {
      path: "/play",
      element: <div>Play</div>
    },
  ]
);

function App() {
  return (
    <div className="App p-3 ">





      <RouterProvider 
        router={router}
      />





      <h1 className='text-3xl font-bold mb-3 text-center text-error'>Cribbage Companion</h1>
      <button className='btn btn-circle btn-success btn-lg'>Play</button>
    
      <div className="card card-outline bg-warning text-neutral-content w-96 m-6">
      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-error">Leaderboard</h2> 
      </div>
</div>
    
    </div>
  
  
    
  );
}

export default App;
