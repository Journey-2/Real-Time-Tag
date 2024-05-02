import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LobbyManagement.css'; 

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png', 
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const LobbyMap = ({ lobbyLocation, radius, users }) => {
    if (!lobbyLocation) return null; 

    return (
        <div>
            <h2>Lobby Map</h2>
            <div className="mapContainer">
                <MapContainer center={[lobbyLocation.latitude, lobbyLocation.longitude]} zoom={14} style={{ height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[lobbyLocation.latitude, lobbyLocation.longitude]} icon={customMarkerIcon}>
                        <Popup>
                            Admin's Location<br />
                            Latitude: {lobbyLocation.latitude.toFixed(6)}, Longitude: {lobbyLocation.longitude.toFixed(6)}
                        </Popup>
                    </Marker>
                    <Circle center={[lobbyLocation.latitude, lobbyLocation.longitude]} radius={radius} fillOpacity={0.1}>
                        <Popup>
                            Radius: {radius} meters
                        </Popup>
                    </Circle>
                    {users.map((user, index) => (
                        <Marker key={`user-${index}`} position={[user.latitude, user.longitude]} icon={customMarkerIcon}>
                            <Popup>
                                User {user.id} <br />
                                Latitude: {user.latitude.toFixed(6)}, Longitude: {user.longitude.toFixed(6)}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default LobbyMap;
