import { useNavigate } from "react-router-dom";

export const Setup = () => {

  const myNav = useNavigate();

  return(
    <div>
      <h1 className='text-xl font-bold mb-3'>Setup</h1>
      <button className="btn btn-success mb-3"
              onClick={() => myNav('/play')}
      >Start Playing</button>
    </div>
  );
}