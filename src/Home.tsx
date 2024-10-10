import { useNavigate } from "react-router-dom";

import { LeaderboardEntry, } from './game-results'

interface HomeProps {
  leaderboardData: LeaderboardEntry[];
}

export const Home: React.FC<HomeProps> = ({
  leaderboardData
}) => {

  //use a react hook for navigation
  const nav = useNavigate();

  return(
    <div>
      <h1 className='text-xl font-bold mb-3'>Home</h1>
      
      <button className="btn btn-success mb-3 onClick={() => nav('/setup')}" 
              onClick={() => nav('/setup')}>
      Play</button>
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