import React from 'react';
import './Home.css'
import bike from '../../images/Frame.png'
import bus from '../../images/Frame-1.png'
import car from '../../images/Frame-2.png'
import train from '../../images/Group.png'
import Card from '../Card/Card';
import fakeData from '../../fakeData.json'
import { useState } from 'react';

const Home = () => {

    const [vehicles, setVehicles] = useState(fakeData)

    return (
        <div>
            <div className="container">
                {
                    vehicles.map(vehicle => <Card vehicle={vehicle} key={vehicle.id}></Card>)
                }
            </div>
        </div>
    );
};

export default Home;