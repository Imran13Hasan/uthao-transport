import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Destination.css'
import map from '../../images/Map.png'

const Destination = () => {
    return (
        <div className="destination-container">
            <div className="destination-box">
                <form className="destination-form" action=""> 
                    <p>Pick From</p>
                    <input type="text" name="from" id="" />
                    <br />
                    <p>Pick To</p>
                    <input type="text" name="to" id="" />
                    <br />
                    <br />
                    <input className="search-btn" type="submit" value="Search" />
                </form>
            </div>
            <div className="map">
                <img src={map} alt="" />
            </div>
        </div>
    );
};

export default Destination;