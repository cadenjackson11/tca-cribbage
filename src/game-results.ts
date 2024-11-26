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
    skunks: number;
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
  ): LeaderboardEntry[] => {
    const lbEntries = getPreviousPlayers(results).map((player) =>
        getLeaderboardEntry(results, player)
    );

    const playersWithWins = lbEntries
        .filter((x) => x.wins > 0)
        .sort(
            (a, b) =>
                (parseFloat(b.avg) * 1000 + b.wins + b.losses)
                - (parseFloat(a.avg) * 1000 + a.wins + a.losses)
        );

        const playersWithoutWins = lbEntries
        .filter((x) => x.wins === 0)
        .sort(
          (a, b) => a.losses - b.losses
        );
    
        return [
            ...playersWithWins
            , ...playersWithoutWins
        ];

}

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


    // Get max turn number for each game, and use as number of turns in the game.
    const arrayOfMaxTurnNumbers = results.map(
        x => Math.max(...x.turns.map(
                y => y.turnNumber
            )
        )
    );

    return (
        arrayOfMaxTurnNumbers.length > 0
            ? arrayOfMaxTurnNumbers.reduce(
                (acc, x) => acc + x
                , 0
            ) / arrayOfMaxTurnNumbers.length
            : 0
    );
};


export const getDealerFacts = (results: GameResult[]) => {
    
    const arrayOfBadDeals = results.map(
        x => Math.max(...x.turns.map(
            y => y.messedUpDeal
        ))
    );

    return (
        arrayOfBadDeals.length > 0
            ? arrayOfBadDeals.reduce(
                (acc, x) => acc + x,
                0
            ) / arrayOfBadDeals.length
            : 0
            )
    ;

};


export const getSkunked = (results: GameResult[]) => {
    
    const arrayOfSkunks = results.map(
        x => Math.max(...x.turns.map(
            y => y.skunks
        ))
    );

    return (
        arrayOfSkunks.length > 0
            ? arrayOfSkunks.reduce(
                (acc, x) => acc + x,
                0
            ) / arrayOfSkunks.length
            : 0
            )
    ;

};





export const getMonthBasedGamesDistribution = (results: GameResult[]) => {

    //get start months 
    const gameStartMonths = results.map(
        //x => new Date(x.startTime).getMonth()
        //x => new Date(x.startTime).getMonth() + 1
        x => new Date(x.startTime).toLocaleDateString(
            'default',
            {
                month: 'short'
            }
        )
    );

    //group by months...
    // const groupedByMonth = Map.groupBy(
    //     gameStartMonths,
    //     x => x
    //)

    const groupedByMonth = gameStartMonths.reduce(
        (acc, x) => acc.set(
            x,
            (acc.get(x) ?? 0) + 1
        ),
        new Map<string, number>([
            ['Jan', 0],
            ['Feb', 0],
            ['Mar', 0],
            ['Apr', 0],
            ['May', 0],
            ['Jun', 0],
            ['July', 0],
            ['Aug', 0],
            ['Sep', 0],
            ['Oct', 0],
            ['Nov', 0],
            ['Dec', 0]
        ])
    )

    return(
        [...groupedByMonth].map(x => ({
            month: x[0],
            gameCount: x[1]
        }))
    )
};



//
// Helper funcs...
//
//




export const getLeaderboardEntry = (
  results: GameResult[],
  player: string,
  //turn: Turn[]
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