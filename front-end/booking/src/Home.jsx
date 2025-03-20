import React from 'react';
import Menu from './assets/menulist.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import Background from "./assets/background.jpg";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  };

  return (
    <>
    <Navbar/>

      <div className='d-flex align-items-center justify-content-center vh-100'>
      <img
            src={Background}
            className="img-fluid position-absolute w-100 vh-100"
            style={{ objectFit: "cover", zIndex: -1 }}
            alt="Background"
          />
      <div className="col-md-8 card shadow p-4">
        <h2 className="text-success text-center text-md-start mb-3">
          WELCOME TO RUVEE NATURE SPA
        </h2>
        <p className="text-muted">
          Come and relax at Ayurvedic Bliss Spa, where we offer treatments to help you feel calm and refreshed. Our spa,
          surrounded by beautiful gardens, has been loved by many visitors for its peaceful atmosphere and skilled therapists.
          Whether you need a deep massage or a full-body treatment, we’re here to give you a relaxing experience. Enjoy
          quality oils, soothing ginger tea, and a welcoming environment. Book your visit today and experience the healing
          power of Ayurveda.
        </p>
        
        <div className="text-center text-md-start w-100 d-flex justify-content-center">
          <button className="btn btn-success px-4 py-2 " onClick={handleClick}>
            Book Now
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;