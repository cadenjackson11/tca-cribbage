import { useNavigate } from "react-router-dom";

export const Home = () => {

  //use a react hook for navigation
  const nav = useNavigate();

  return(
    <div>
      <h1 className='text-xl font-bold mb-3'>Home</h1>
      
      <button className="btn btn-success mb-3 onClick={() => nav('/setup')}" 
              onClick={() => nav('/setup')}>
      Play</button>
    </div>
  );
}