import { useNavigate } from "react-router-dom";
import { GameResult } from "./game-results";
import { useState } from "react";

interface PlayProps {
  addNewGameResult: (gr: GameResult) => void;
  currentPlayers: string[];
}

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  currentPlayers

}) => {

  const nav = useNavigate();

  const [startTimeState, setStartTimeState] = useState(new Date().toISOString())

  return(
    <div>
      <h1 className='text-xl font-bold mb-3'>Play</h1>
      {
        currentPlayers.map(x => (
          <button className="btn btn-success mb-3"
                  
          onClick={() => {
            addNewGameResult({
              startTime: startTimeState,
              endTime: new Date().toISOString(),
              winner: x,
              players: currentPlayers
            })
            nav(-2)
          }}
  >
    {x} Won
  </button>
        ))
      }
      
    </div>
  );
}