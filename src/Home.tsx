import { useNavigate } from "react-router-dom";
import { LeaderboardEntry, GeneralFactsDisplay} from './game-results'

interface HomeProps {
  leaderboardData: LeaderboardEntry[];
  generalFactsData: GeneralFactsDisplay;
}

export const Home: React.FC<HomeProps> = ({
  leaderboardData,
  generalFactsData
}) => {

  //use a react hook for navigation
  const nav = useNavigate();

  return(
    <div data-theme="retro">

      
      <button className="btn btn-success mb-3 onClick={() => nav('/setup')}" 
              onClick={() => nav('/setup')}>
      Play Cribbage</button>
      <div className="card bg-base-100 shadow-xl mb-3">
        <div className="card body p-3 overflow-x-hidden mb-3">
          <h2 card-title>General Facts</h2>
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
          <h2 card-title>Leaderboard</h2>
          {
            leaderboardData.length > 0
            ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>W</th>
                <th>L</th>
                <th>AVG</th>
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
    </div>
  );
}