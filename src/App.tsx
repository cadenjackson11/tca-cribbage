import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import {AppTitle, Home} from './Home';
import {Setup} from './Setup';
import {Play} from './Play';
import { How } from './How';

import { 
    CurrentPlayer, 
    GameResult, 
    LeaderboardEntry, 
    getLeaderboard, 
    getPreviousPlayers, 
    getGeneralFacts, 
    getAvgTurnsPerGame, 
    getMonthBasedGamesDistribution, 
    getDealerFacts,
    getSkunked
} from './game-results';

import localforage from 'localforage';

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api'


const App = () => {

  //react hooks first

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [currentPlayers, setCurrentPlayers] = useState<CurrentPlayer[]>([]);

  const [title, setTitle] = useState(AppTitle)

  // other code... calculated state

  const addNewGameResult = async (newResult: GameResult) => {

    try {

      if(emailForCloudApi.length > 0){
        await saveGameToCloud(
          emailForCloudApi,
          "tca-cribbage-24f",
          newResult.endTime,
          newResult
        );
      }

      setGameResults([
        ...gameResults,
        newResult
      ]);
    } catch(e) {
      console.error(e);
    }
  }

    //think about this for your switch dealer addition!!!

  const [darkMode, setDarkMode] = useState(false);

  const emailModalRef = useRef<HTMLDialogElement | null>(null);

  const [emailOnModal, setEmailOnModal] = useState("");

  const [emailForCloudApi, setEmailForCloudApi] = useState("");

  //special react hook use last
  useEffect(
    () => {
      
      const loadDarkMode = async () => {

        const savedDarkMode = await localforage.getItem<boolean>("darkMode") ?? false;

        if (!ignore) {
          setDarkMode(savedDarkMode);
          
        }
      }

      let ignore = false;

      loadDarkMode();
      
      return () => {
        ignore = true;
      }
    }
    , []
  );


  useEffect(
    () => {
      
      const loadEmail = async () => {

        const savedEmail = await localforage.getItem<string>("email") ?? "";

        if (!ignore) {
          setEmailOnModal(savedEmail);
          setEmailForCloudApi(savedEmail);
        }
      }

      let ignore = false;

      loadEmail();
      
      return () => {
        ignore = true;
      }
    }
    , []
  );


  useEffect(
    () => {
      
      const loadGameResults = async () => {

        const savedGameResults = await loadGamesFromCloud(
          emailForCloudApi,
          "tca-cribbage-24f"
        )

        if (!ignore) {
          setGameResults(savedGameResults);
        }
      }

      let ignore = false;

      if (emailForCloudApi.length > 0) {
        loadGameResults();
      }
      
      return () => {
        ignore = true;
      }
    }
    , [emailForCloudApi]
  );



  
  const myRouter = createHashRouter(
    [
      {
        path: "/",
        element: <Home 
          leaderboardData={getLeaderboard(gameResults)}
          generalFactsData={getGeneralFacts(gameResults)}
          setTitle={setTitle}
          gamesPlayedByMonthData={getMonthBasedGamesDistribution(gameResults)}
          avgTurnsPerGame={getAvgTurnsPerGame(gameResults)} 
          messedUpDeal={getDealerFacts(gameResults)}
          skunks={getSkunked(gameResults)}
        />
      },
      {
        path: "/setup",
        element: <Setup
          previousPlayers={getPreviousPlayers(gameResults)}
          setCurrentPlayers={setCurrentPlayers}
          setTitle={setTitle}
         />
      },
      {
        path: "/play",
        element: <Play 
          addNewGameResult={addNewGameResult}
          currentPlayers={currentPlayers}
          setTitle={setTitle}
        />,
      },
      {
        path: "/how",
        element: <How 
          setTitle={setTitle}
        />,
      },
    ]
  )

  //return jsx

  return (
    <div
      className="App"
      data-theme={darkMode ? "dark" : "light"}
    >
      <div 
        className="navbar bg-base-200"
      >
        <span 
          className="text-4xl ml-1 font-bold">
            { title }
        </span>

        <div className="flex gap-1 ml-auto">
          <button 
            className='btn'
            onClick={() => emailModalRef.current?.showModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
              </svg>
          </button>
        <label className="swap swap-rotate">
          <input 
            type="checkbox"
            checked={darkMode}
            onChange={async () => {
              await localforage.setItem<boolean>("darkMode", !darkMode);
              setDarkMode(!darkMode);
            }}
           />

          
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        </div>

        
      </div>
      
      <div 
        className="p-3 min-h-screen"
      >
        <RouterProvider
          router={myRouter}
        />
      </div>


      <dialog 
        ref={emailModalRef}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            <input 
              className="input input-bordered w-full" 
              placeholder="Enter email to load/save game results..." 
              value={emailOnModal}
              onChange={(e) => setEmailOnModal(e.target.value)}
              />
              
          </h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button 
                className="btn"
                onClick={
                  async () => {
                    const savedEmail = await localforage.setItem<string>("email", emailOnModal);

                    if(savedEmail.length > 0) {
                      setEmailForCloudApi(savedEmail);
                    }

                  }
                }
              >Save</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  );
}

export default App;