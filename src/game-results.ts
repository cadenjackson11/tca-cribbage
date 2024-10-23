//
//  Type Definitions
//

export type GameResult = {
  startTime: string;
  endTime: string;

  winner: string;
  players: string[];
};


export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
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
    const lastPlayedInDays = lastPlayedInMilliseconds / 1000 / 60 / 60 / 24;

    const gameDurationsInMilliseconds = results.map(
        x => Date.parse(x.endTime) - Date.parse(x.startTime)
    );

    const shortestGameInMilliseconds = Math.min(...gameDurationsInMilliseconds);
    const shortestGameInMinutes = shortestGameInMilliseconds / 1000 / 60;

    const longestGameInMilliseconds = Math.max(...gameDurationsInMilliseconds);
    const longestGameInMinutes = longestGameInMilliseconds / 1000 / 60;

    return {
        lastPlayed: `${lastPlayedInDays.toFixed(0)} day(s) ago`
        , totalGames: results.length
        , shortestGame: `${shortestGameInMinutes.toFixed(1)} minutes`
        , longestGame: `${longestGameInMinutes.toFixed(1)} minutes`
    };
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