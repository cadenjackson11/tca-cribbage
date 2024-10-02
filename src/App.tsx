import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App p-3 bg-base-200">
      <h1 className='text-3xl font-bold mb-3 text-center text-error'>Cribbage Companion</h1>
      <button className='btn btn-circle btn-accent btn-lg items-center'>Play</button>
    
      <div className="card card-outline bg-warning text-neutral-content w-96 m-6">
      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-error">Leaderboard</h2> 
      </div>
</div>
    
    </div>
  
  
    
  );
}

export default App;
