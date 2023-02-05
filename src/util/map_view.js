import React from 'react';
import '../css/App.css';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function MapView(props) {
    let coordinate = props.coordinate;
    const position = [coordinate["y"], coordinate["x"]];
    let DefaultIcon = leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    leaflet.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Station: {props.station_name}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapView;
