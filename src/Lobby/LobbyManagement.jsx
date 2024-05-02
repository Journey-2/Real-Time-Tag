import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import LobbyMap from './LobbyMap';
import './LobbyManagement.css'; 

const LobbyManagement = () => {
    const [radiusMeters, setRadiusMeters] = useState(1000); 
    const [usersInCircle, setUsersInCircle] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState('');

    const fetchUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLocationError('');
                },
                () => {
                    setLocationError('Failed to retrieve your location.');
                }
            );
        } else {
            setLocationError('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        fetchUserLocation(); 
    }, []);

    const fetchUsersInCircle = async () => {
        if (!userLocation) {
            setLocationError('User location is not set.');
            return;
        }

        try {
            const metaCollectionRef = collection(firestore, 'locations');
            const metaSnapshot = await getDocs(metaCollectionRef);
            
            const collectionNames = metaSnapshot.docs.map(doc => doc.id);

            console.log('Collection Names:', collectionNames);

        } catch (error) {
            console.error('Error fetching collection names:', error);
        }
    };

    const handleRadiusChange = event => {
        const inputRadius = parseFloat(event.target.value);
        setRadiusMeters(isNaN(inputRadius) ? 0 : inputRadius);
    };

    const handleConfirmRadius = () => {
        if (!userLocation) {
            setLocationError('User location is not set.');
            return;
        }

        fetchUsersInCircle();
    };

    return (
        <div className="container">
            <div className="radiusControl">
                <label>Set Circle Radius (in meters):</label>
                <input
                    type="number"
                    value={radiusMeters}
                    onChange={handleRadiusChange}
                    step="100"
                />
                <button onClick={handleConfirmRadius}>Confirm Radius</button>
            </div>
            {userLocation && (
                <LobbyMap
                    lobbyLocation={userLocation}
                    radius={radiusMeters}
                    users={usersInCircle}
                />
            )}
            {locationError && <p className="error">{locationError}</p>}
        </div>
    );
};

export default LobbyManagement;