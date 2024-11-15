import { durationFormatter } from 'human-readable'

const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d"]
});


//
//  Type Definitions
//

export type Turn = {
    turnNumber: number;
    player: string;
    messedUpDeal: number;
    
};


export type GameResult = {
  startTime: string;
  endTime: string;

  winner: string;
  players: string[];

  turns: Turn[];
};


export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    name: string;  
  };

  export type CurrentPlayer = {
    name: string;
};


export type GeneralFactsDisplay = {
    lastPlayed: string; 
    totalGames: number; 
    shortestGame: string;
    longestGame: string;
};


//
//  Exported funcs...
//

export const getLeaderboard = (
  results: GameResult[]
  ): LeaderboardEntry[] => getPreviousPlayers(results)
    .map(
        player => getLeaderboardEntry(
            results
            , player
        )
    )
    .sort(
        (a, b) => (parseFloat(b.avg) * 1000 + b.wins + b.losses) 
            - (parseFloat(a.avg) * 1000 + a.wins + a.losses)
    )
  ;


  export const getPreviousPlayers = (results: GameResult[]) => {
    
    const previousPlayers = results.flatMap(
        x => x.players
    );

    return(
        [
            ...new Set(previousPlayers)
        ].sort(
            (a, b) => a.localeCompare(b)
        )
    );
};

export const getGeneralFacts = (results: GameResult[]): GeneralFactsDisplay => {

    const now = Date.now();
    const gameEndTimesInMilliseconds = results.map(x => Date.parse(x.endTime));

    const lastPlayedInMilliseconds = now - Math.max(...gameEndTimesInMilliseconds);

    const gameDurationsInMilliseconds = results.map(
        x => Date.parse(x.endTime) - Date.parse(x.startTime)
    );

    const shortestGameInMilliseconds = Math.min(...gameDurationsInMilliseconds);
    const longestGameInMilliseconds = Math.max(...gameDurationsInMilliseconds);

    return {
        lastPlayed: results.length > 0
            ? `${formatLastPlayed(lastPlayedInMilliseconds)} ago`
            : "You've Never Played"

        , totalGames: results.length

        , shortestGame: results.length > 0
            ? formatGameDuration(shortestGameInMilliseconds)
            : "..."
        , longestGame: results.length > 0 
            ? formatGameDuration(longestGameInMilliseconds)
            : "..."
    };
};

export const getAvgTurnsPerGame = (results: GameResult[]) => {

    // Current dummyGameResults has...
    // . 2 games 
    // . 1 game has 3 turns 
    // . 1 game has 2 turns 
    // . expect avg to be (3 + 2) / 2 = 2.5

    // Get max turn number for each game, and use as number of turns in the game.
    const arrayOfMaxTurnNumbers = results.map(
        x => Math.max(...x.turns.map(
                y => y.turnNumber
            )
        )
    );

    // console.log(arrayOfMaxTurnNumbers); // Expect [3, 2]

    return (
        arrayOfMaxTurnNumbers.length > 0
            ? arrayOfMaxTurnNumbers.reduce(
                (acc, x) => acc + x
                , 0
            ) / arrayOfMaxTurnNumbers.length
            : 0
    );
};

//
// Helper funcs...
//




export const getLeaderboardEntry = (
  results: GameResult[]
  , player: string
): LeaderboardEntry => {

  const playerWins = results.filter(
      x => x.winner === player
  ).length;

  const playerGames = results.filter(
      x => x.players.some(
          y => y === player
      )
  ).length;

  return {
      wins: playerWins
      , losses: playerGames - playerWins 

      , avg: playerGames > 0
          ? (playerWins / playerGames).toFixed(3)
          : "0.000"

      , name: player
  };
};