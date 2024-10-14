import { useNavigate } from "react-router-dom";
import { GameResult } from "./game-results";

interface PlayProps {
  addNewGameResult: (gr: GameResult) => void;
  currentPlayers: string[];
}

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  currentPlayers

}) => {

  const nav = useNavigate();

  return(
    <div>
      <h1 className='text-xl font-bold mb-3'>Play</h1>
      <button className="btn btn-success mb-3"
              
              onClick={() => {
                addNewGameResult({
                  startTime:"",
                  endTime: "",
                  winner: "Chewie",
                  players: currentPlayers
                })
                nav(-2)
              }}
      >
        {x} Won
      </button>
    </div>
  );
}