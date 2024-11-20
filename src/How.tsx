import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HowToProps {
  setTitle: (t: string) => void;
}

export const How: React.FC<HowToProps> = ({
  setTitle
}) => {

  useEffect(
    () => setTitle('How To Play'),
    []
  );

  const myNav = useNavigate();

  
  return(
    <div data-theme="autumn" className="p-3 bg-neutral-content">
      <p className="text-center">
        <button 
          className="btn btn-success mb-3 onClick={() => nav('/')}"
          onClick={() => myNav(-1)}>
            Back To Home
        </button>
      </p>
      <div className="bg-secondary shadow-xl" >
        <div className="card-body bg-neutral rounded-box m-3">
          <h1 className="text-center text-2xl font-bold">Cribbage</h1>
          <p className="text-white text-center">
            Cribbage is a fun but lengthily described card game. I have decided to outsource this explanation to the official 
            Cribbage website. Check out the link below!
          </p>
          <a href="https://bicyclecards.com/how-to-play/cribbage" className="link-info text-center font-bold">How To Play Cribbage</a>
        </div>
        <div className="card-body bg-neutral rounded-box m-3">
          <h1 className="text-center text-2xl font-bold">Cribbage Companion</h1>
          <p className="text-white text-center">
            The Cribbage Companion App is an app that tracks information about the games you, your friends, and your family play.
            The app allows you to see the leaderboard, standings, stats, fun facts, and more. It functions as a real tracker of 
            not only skill, but also bragging rights. The way to play is simple, click "Play Cribbage" back at the home screen 
            and get started. 
          </p>
          <br />
          <p className="text-white text-center">The next screen is for setting up the players who are participating. If you have not previously 
            played the companion app, enter your name in the text box and click add. Your name will automatically be selected,
            next enter in the name, or select the name of your opponent and click "Start Playing".
          </p>
          <br />
          <p className="text-white text-center">The next screen is for setting up the players who are participating. If you have not previously 
            played the companion app, enter your name in the text box and click add. Your name will automatically be selected,
            next enter in the name, or select the name of your opponent and click "Start Playing".
          </p>
          <br />
          <p className="text-white text-center">
            Finally we get to the "fun part".
            <br />
            <br />
            Here on the "Play" screen you will immediately notice the first players name displayed in the dealer section. That dealer will
            go ahead and make the first deal in the real world. If this dealer messed up, click on the "Deal Gone Wrong" button. When this turn 
            is over, click "Next Deal" and repeat the process until the game is over. 
            <br />
            <br />
            <span className="text-warning font-bold">
              B.T.W do not worry if you accidentally clicked or did not click the deal gone wrong button. If there is a mess up, simply click 
              undo deal and re-click/don't click the button and continue on as normal.
            </span>
            <br />
            <br />
            Finally, select the name of the player who won down below in the "Winner" section. This will return you to the Home screen and 
            you can now see the updated information in the leaderboards!
          </p>
          <h2 className="text-success text-center text-4xl font-bold">Have Fun!</h2>
        </div>
      </div>
    </div>
  );
}

