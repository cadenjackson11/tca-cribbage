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
  const [deal, setDeal] = useState(false);

  return(
    
    <div data-theme="autumn" className="p-3">

      <div className="bg-neutral-content rounded-box p-3 text-center m-3">
        
        <h1 className="text-center text-xl text-white font-bold bg-info p-3 rounded-box">
          {currentPlayers}
            <span>
              <button className="bg-primary rounded-box p-2.5 ml-3 content-end">Next Turn</button>
            </span>
        </h1>
        

      </div>

      <div className="bg-neutral-content rounded-box p-3 m-3">
      <h1 className="text-center text-xl text-white font-bold bg-accent p-3 rounded-box">Winner</h1>
      {
        currentPlayers.map(x => (
          <p className="text-center"><button className="btn btn-neutral hover:btn-success m-3"
                  
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
            {x}
          </button></p>

          
        ))
      }
      </div>
      
      
    </div>
    
  );
}