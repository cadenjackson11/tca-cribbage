import { useNavigate } from "react-router-dom";
import { LeaderboardEntry, GeneralFactsDisplay} from './game-results'
import { useEffect } from "react";

export const AppTitle = "Cribbage Companion App";

interface HomeProps {
  leaderboardData: LeaderboardEntry[];
  generalFactsData: GeneralFactsDisplay;
  setTitle: (t: string) => void;
  gamesPlayedByMonthData: {month: string, gameCount: number}[];
  avgTurnsPerGame: number;
  messedUpDeal: number;
  skunks: number;
};

export const Home: React.FC<HomeProps> = ({
  leaderboardData,
  generalFactsData,
  setTitle,
  gamesPlayedByMonthData,
  avgTurnsPerGame,
  messedUpDeal,
  skunks
}) => {

  useEffect(
    () => setTitle(AppTitle),
    []
  );

  //use a react hook for navigation
  const nav = useNavigate();

  return(
    <div data-theme="autumn" className="p-3 bg-neutral-content">
      
      <p className="text-center"><button className="btn btn-success mb-3 onClick={() => nav('/setup')}" 
              onClick={() => nav('/setup')}>
      Play Cribbage</button></p>
      <br />
      <p className="text-center">
        <button 
          className="btn btn-success mb-3 onClick={() => nav('/how')}"
          onClick={() => nav('/how')}>
            How To Play
        </button>
      </p>
      <div className="card bg-base-100 shadow-xl mb-3">
        <div className="card body p-3 overflow-x-hidden mb-3">
          <h2 card-title className="bg-accent text-center font-bold rounded-box p-3">General Facts</h2>
          {
            leaderboardData.length > 0
            ? (
          <table className="table table-zebra">
            <tbody>
            <tr>
                <td>
                  Last Played
                </td>
                <th>
                  {generalFactsData.lastPlayed}
                </th>
              </tr>
              <tr>
                <td>
                  Shortest Game
                </td>
                <th>
                  {generalFactsData.shortestGame}
                </th>
              </tr>
              <tr>
                <td>
                  Longest Game
                </td>
                <th>
                  {generalFactsData.longestGame}
                </th>
              </tr>
              <tr>
                <td>
                  Total Games
                </td>
                <th>
                  {generalFactsData.totalGames}
                </th>
              </tr>
            </tbody>
          </table>
            )
            : (
              <p>Play a game to see the leaderboard!</p>
            )
          }
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card body p-3 overflow-x-hidden">
          <h2 card-title className="bg-accent text-center font-bold rounded-box p-3">Leaderboard</h2>
          {
            leaderboardData.length > 0
            ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>W</th>
                <th>L</th>
                <th>AVG</th>
                <th>Player</th>
              </tr>
            </thead>
            <tbody>
              {
                leaderboardData.map(x => (
                  <tr key={x.name}>
                    <td>{x.wins}</td>
                    <td>{x.losses}</td>
                    <td>{x.avg}</td>
                    <td>{x.name}</td>
                  </tr>

                ))
              }
            </tbody>
          </table>
            )
            : (
              <p>Play a game to see the leaderboard!</p>
            )
          }
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl mt-3">
        <div className="card body p-3 overflow-x-hidden">
          <h2 card-title className="bg-accent text-center font-bold rounded-box p-3">Monthly Games Played</h2>
          {
            leaderboardData.length > 0
            ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>MONTH</th>
                <th>GAMES</th>
              </tr>
            </thead>
            <tbody>
              {
                gamesPlayedByMonthData.map(x => (
                  <tr key={x.month}>
                    <td>{x.month}</td>
                    <td>{x.gameCount}</td>
                  </tr>

                ))
              }
            </tbody>
          </table>
          
            )
            : (
              <p>Play a game to see the leaderboard!</p>
            )
          }

          
            <div
                className="card bg-base-100 shadow-xl mb-3">
                <div
                    className="card-body p-3 overflow-x-hidden">
                    <h2 className="card-title">
                        Percentage of games with a bad deal
                    </h2>
                    <h1 className="text-5xl font-bold">{(messedUpDeal * 100).toFixed(2)}%</h1>
                </div>
            </div>
          
          <div className="card card bg-base-100 shadow-xl mb-3">
                <div className="card-body p-3 overflow-x-hidden">
                    <h2 className="card-title">
                        Avg Turns Per Game
                    </h2>
                    <h1 className="text-5xl font-bold">
                        {avgTurnsPerGame.toFixed(2)}
                    </h1>
                </div>
            </div>

            <div
                className="card bg-base-100 shadow-xl mb-3">
                <div
                    className="card-body p-3 overflow-x-hidden">
                    <h2 className="card-title">
                        Percentage of games with a Skunk
                    </h2>
                    
                    <h1 className="text-5xl font-bold">{(skunks * 100).toFixed(2)}%</h1>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}