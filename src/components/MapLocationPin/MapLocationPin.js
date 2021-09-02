import React from 'react';
import { Icon } from '@iconify/react'


const MapLocationPin = ({text}) => {
    return (
        <div className="pin">
            <Icon className="pin-icon" icon="entypo:location-pin" />
            <p className="pin-text">{text}</p>
        </div>
    );
};

export default MapLocationPin;