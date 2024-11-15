import { useNavigate } from "react-router-dom";
import { GameResult, CurrentPlayer, Turn } from "./game-results";
import { useEffect, useState } from "react";

interface PlayProps {
  addNewGameResult: (gr: GameResult) => void;
  currentPlayers: CurrentPlayer[];
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

  const [startTimeState, setStartTimeState] = useState(new Date().toISOString());

  const [turns, setTurns] = useState<Turn[]>([
    {
        turnNumber: 1
        , player: currentPlayers[0].name
        , messedUpDeal: 0
    }
]);


const messedUpDealers = currentPlayers.map(x => ({
  name: x.name,
  messedUpDealTotal: turns.filter(
    y => y.player === x.name
  ).map(
    y => y.messedUpDeal
  ).reduce(
    (acc, y) => acc + y,
    0
  )
}));

const updateTotalBadDeals = (
  player: string,
  turnNumber: number,
  delta: number
) => setTurns(
  turns.map(
    x => ({
      ...x,
      messedUpDeal: player === x.player && turnNumber === x.turnNumber
        ? x.messedUpDeal === 0
          ? 0
          : x.messedUpDeal === 1
            ? 1
            : x.messedUpDeal
        : x.messedUpDeal  
    })
  )
);
  
  

  return(
    
    <div data-theme="autumn" className="p-3">

      <div className="bg-neutral-content rounded-box p-3 m-3">
        
        {
          turns.map((x, i) => (
            <div 
              className="flex gap-3 mb-3"
              key={`${x.turnNumber} ${x.player}`}
            >
                <div className="align-top text-2xl">
                    {x.turnNumber}
                </div>

                <div className="text-2xl123">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-bold123">
                            {x.player}
                         </h3>
                         {
                          turns.length - 1 === i
                            ? (
                              <div className="flex flex-col gap-3">
                                  <div className="flex gap-3">
                                      <div className="join flex">
                                          <button 
                                            className="btn btn-sm btn-outline join-item"
                                            onClick={() => updateTotalBadDeals(
                                                x.player
                                                , x.turnNumber
                                                , +1
                                            )}
                                          >
                                            Click For A Deal Gone Wrong
                                          </button>
                                          <span className="join-item text-xl w-8 text-center">
                                              {x.messedUpDeal}
                                          </span>
                                          
                                      </div>
                                  </div>
                              </div>
                            )
                            : (
                              <div className="flex flex-col gap-3 text-sm">
                                  <div>
                                      {x.messedUpDeal} bad deal(s)
                                  </div>
                              </div>
                            )
                         }
                    </div>
                </div>

            </div>
          ))
        }

        <div className="join mt-10 ml-9">
            <button 
              className="join-item btn btn-outline btn-sm"
              onClick={() => turns.length > 1 && setTurns(turns.slice(0, -1))}  
            >
                Undo Deal
            </button>
            <button
              className="join-item btn btn-outline btn-sm"
              onClick={() => setTurns([
                ...turns
                , {
                  turnNumber: turns.length % currentPlayers.length > 0
                    ? Math.ceil(turns.length / currentPlayers.length)
                    : (turns.length / currentPlayers.length) + 1
                  , player: currentPlayers[
                    turns.length % currentPlayers.length
                  ].name
                  , messedUpDeal: 0
                }
              ])}
            >
              Next Deal
            </button>
        </div>

      </div>

      <div className="bg-neutral-content rounded-box p-3 m-3">
      <h1 className="text-center text-xl text-white font-bold bg-accent p-3 rounded-box">Winner</h1>

      {
        currentPlayers.map(x => (
          <div key={x.name} className="flex flex-col gap-3 mb-5 text-sm">
              <h2 className="font-lg font-bold">
                {x.name}
              </h2>
              <div className="ml-3">
                  {
                    turns.filter(
                      y => y.player === x.name
                    ).map(
                      y => y.messedUpDeal
                    ).reduce(
                      (acc, y) => acc + y
                      , 0
                    )
                  } Bad Deals
              </div>

              <p className="text-center"><button className="btn btn-neutral hover:btn-success m-3"
                  
          onClick={() => {
            addNewGameResult({
              startTime: startTimeState,
              endTime: new Date().toISOString(),
              winner: x.name,
              players: currentPlayers.map(y => y.name),
              turns: turns
            })
            nav(-2)
          }}
          >
            {x.name} Won
          </button></p>
          </div>
          
        ))
      }
      
      
      </div>
      
      
    </div>
    
  );
}