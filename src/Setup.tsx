import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentPlayer } from "./game-results";


interface SetupProps {
  previousPlayers: string[];
  setCurrentPlayers: (players: CurrentPlayer[]) => void;
  setTitle: (t: string) => void;
}

export const Setup: React.FC<SetupProps> = ({
  previousPlayers,
  setCurrentPlayers,
  setTitle
}) => {

  useEffect(
    () => setTitle('Setup'),
    []
  );

  const myNav = useNavigate();

  const [availablePlayers, setAvailablePlayers] = useState(previousPlayers.map(x => ({
    name: x
    , checked: false
  })));

  const [newPlayerName, setNewPlayerName] = useState("")

  const validateAndAddNewPlayer = () => {
    //bail if nothing typed in the name or if there is a duplicate name

    if (newPlayerName.length === 0 ||  availablePlayers.some(
      x => x.name.toUpperCase() === newPlayerName.toUpperCase()
    )) {
      return;
    }

    setAvailablePlayers([
      ...availablePlayers,
      {
        name: newPlayerName
        , checked: true
      }
    ].sort(
      (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    )
  );

  }

  const twoPlayersChosen = availablePlayers.filter(x => x.checked).length !== 2;

  return(
    <div data-theme="autumn" className="p-3 bg-neutral-content">
      
      <p className="text-center"><button className="btn btn-success mb-3"
              disabled={twoPlayersChosen}
              onClick={() => {
                setCurrentPlayers(
                  availablePlayers
                    .filter(x => x.checked)
                    .map(x => ({
                      name: x.name
                    }))
                    
                );
                myNav('/play')
              }}
      >{
        twoPlayersChosen
        ? "Choose Two Players"
        : "Start Playing"
      }</button></p>
      <div className="card bg-base-100 shadow-xl" >
        <div className="card-body">
          <p className="text-center bg-accent rounded-box p-3"><div className="join">
            <input className="input input-bordered join-item mr-3" placeholder="Enter New Player Name" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)}/>
            <button className="btn join-item" disabled={newPlayerName.length === 0} onClick={validateAndAddNewPlayer}>Add</button>
          </div></p>
          
          {
            availablePlayers.map(x => (
              
              <div className="form-control">
                <label className="cursor-pointer items-center flex mt-3">
                  
                  <input type="checkbox" className="checkbox mr-3" checked={x.checked} onChange={() => setAvailablePlayers(
                    availablePlayers.map(y => ({
                      ...y, 
                      checked: y.name === x.name
                                  ? !y.checked
                                  : y.checked
                    }))
                  )}/>
                  <span className="label-text">{x.name}</span>
                </label>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}