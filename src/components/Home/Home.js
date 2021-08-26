import React from 'react';
import './Home.css'
import bike from '../../images/Frame.png'
import bus from '../../images/Frame-1.png'
import car from '../../images/Frame-2.png'
import train from '../../images/Group.png'

const Home = () => {
    return (
        <div>
            <div className="container">
                <div className="card-container">
                    <div className="card">
                        <img src={bike} alt="" />
                        <p>BIKE</p>
                    </div>
                    <div className="card">
                        <img src={bus} alt="" />
                        <p>BUS</p>
                    </div>
                    <div className="card">
                        <img src={car} alt="" />
                        <p>CAR</p>
                    </div>
                    <div className="card">
                        <img src={train} alt="" />
                        <p>TRAIN</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;