import { useNavigate } from "react-router-dom";
import { LeaderboardEntry, GeneralFactsDisplay} from './game-results'
import { useEffect } from "react";

export const AppTitle = "Cribbage Companion App";

interface HomeProps {
  leaderboardData: LeaderboardEntry[];
  generalFactsData: GeneralFactsDisplay;
  setTitle: (t: string) => void;
  gamesPlayedByMonthData: {month: string, gameCount: number}[];
}

export const Home: React.FC<HomeProps> = ({
  leaderboardData,
  generalFactsData,
  setTitle,
  gamesPlayedByMonthData
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
                <th>Bad Deals</th>
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
                    <td>...</td>
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
        </div>
      </div>
    </div>
  );
}