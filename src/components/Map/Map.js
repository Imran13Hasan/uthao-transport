import React from 'react';
import './Map.css'
import GoogleMapReact from 'google-map-react'
import MapLocationPin from '../MapLocationPin/MapLocationPin';

const Map = ({ location, zoomLevel }) => {
    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={location}
                    defaultZoom={zoomLevel}
                >
                    <MapLocationPin
                        lat={location.lat}
                        lng={location.lng}
                        text={location.address}
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default Map;