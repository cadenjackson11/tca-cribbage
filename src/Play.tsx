import { useNavigate } from "react-router-dom";
import { GameResult } from "./game-results";
import { useEffect, useState } from "react";

interface PlayProps {
  addNewGameResult: (gr: GameResult) => void;
  currentPlayers: string[];
  setTitle: (t: string) => void;
}

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  currentPlayers,
  setTitle

}) => {

  useEffect(
    () => setTitle('Play'),
    []
  )

  const nav = useNavigate();

  const [startTimeState, setStartTimeState] = useState(new Date().toISOString())

  return(
    
    <div data-theme="retro">
      
      {
        currentPlayers.map(x => (
          <button className="btn btn-success mb-3 mr-3"
                  
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