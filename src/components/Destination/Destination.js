import React from 'react';
import './Destination.css'
import Map from '../Map/Map';

const Destination = (props) => {
    const location = {
        address: `Imran Hasan's Home, Araihazar, Narayangonj, Dhaka, Bangladesh.`,
        lat: 23.79167628264851,
        lng: 90.65373869924521
    }
    return (
        <div className="destination-container">
            <div className="destination-box">
                <form className="destination-form" action="">
                    <p>Pick From:</p>
                    <input type="text" name="from" id="" />
                    <br />
                    <p>Pick To:</p>
                    <input type="text" name="to" id="" />
                    <br />
                    <br />
                    <input className="search-btn" type="submit" value="Search" />
                </form>
            </div>
            <div className="map">
                <Map location={location} zoomLevel={17} />
            </div>
        </div>
    );
};

export default Destination;