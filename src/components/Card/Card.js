import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

const Card = (props) => {
    const { id, image, type } = props.vehicle;
    return (
        <Link to="/destination" style={{ textDecoration: 'none' }}>
            <div className="card-container">
                <img src={image} alt="vehicle" />
                <h2>{type}</h2>
            </div>
        </Link>
    );
};

export default Card;