import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="background-home"></div>
      <div className="content-container">
        <h1>Welcome to My Site</h1>
        <h3>Press the button below</h3>
        <button className="home-button" onClick={() => navigate('/products')}> Go to Products </button>
      </div>
    </div>
  );
};

export default Home;
