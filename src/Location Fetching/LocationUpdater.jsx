import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, doc, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";
import { getAuth } from "firebase/auth"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const LocationUpdater = () => {
  const [user1LocationsData, setUser1LocationsData] = useState([]);
  const [user2LocationsData, setUser2LocationsData] = useState([]);
  const [user3LocationsData, setUser3LocationsData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [counter, setCounter] = useState(1); 

  useEffect(() => {
    const fetchLocations = async () => {
      const user1Query = query(
        collection(firestore, "user1"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const user1Snapshot = await getDocs(user1Query);
      const user1Data = user1Snapshot.docs.map((doc) => doc.data());
      setUser1LocationsData(user1Data);

      const user2Query = query(
        collection(firestore, "user2"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const user2Snapshot = await getDocs(user2Query);
      const user2Data = user2Snapshot.docs.map((doc) => doc.data());
      setUser2LocationsData(user2Data);

      const user3Query = query(
        collection(firestore, "user3"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const user3Snapshot = await getDocs(user3Query);
      const user3Data = user3Snapshot.docs.map((doc) => doc.data());
      setUser3LocationsData(user3Data);
    };

    const storeLocation = async () => {
      try {
        const currentUserUID = getAuth().currentUser?.uid; 
        const timestamp = new Date().toISOString(); 

        if (currentUserUID === "HQzGwH044kRvea03tg6YXGMUElv1") {
          await setDoc(doc(collection(firestore, "user1"), timestamp), {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            timestamp: new Date(),
          });
        } else if (currentUserUID === "maj7VIX72wNL43UJm8dd6zM2Unq2") {
          await setDoc(doc(collection(firestore, "user2"), timestamp), {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            timestamp: new Date(),
          });
        } else if (currentUserUID === "JOMYHh2GlAR4gZ7VXOYrlUWErhM2") {
          await setDoc(doc(collection(firestore, "user3"), timestamp), {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            timestamp: new Date(),
          });
        } else {
          console.log("Current user is not authorized to add locations to any collection.");
        }

        setCounter((prevCounter) => prevCounter + 1);
      } catch (error) {
        console.error("Error adding location: ", error);
      }
    };

    const interval = setInterval(() => {
      fetchLocations(); 
      storeLocation();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentLocation]); 

  useEffect(() => {
    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    };

    fetchCurrentLocation(); 

    const interval = setInterval(fetchCurrentLocation, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentUserUID = getAuth().currentUser?.uid; 
    if (currentUserUID === "HQzGwH044kRvea03tg6YXGMUElv1") {
      console.log("Current user's UID matches: HQzGwH044kRvea03tg6YXGMUElv1");
    } else if (currentUserUID === "maj7VIX72wNL43UJm8dd6zM2Unq2") {
      console.log("Current user's UID matches: maj7VIX72wNL43UJm8dd6zM2Unq2");
    } else if (currentUserUID === "JOMYHh2GlAR4gZ7VXOYrlUWErhM2") {
      console.log("Current user's UID matches: JOMYHh2GlAR4gZ7VXOYrlUWErhM2");
    } else {
      console.log("Current user's UID does not match any authorized UID.");
    }
  }, []);

  return (
    <div>
      <h2>Live Location Updates</h2>
      <div style={{ height: "400px" }}>
        {currentLocation.latitude !== 0 && (
          <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={18} style={{ height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
            />
            <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={customMarkerIcon}>
              <Popup>
                Your Current Location <br />
                Latitude: {currentLocation.latitude}, Longitude: {currentLocation.longitude}
              </Popup>
            </Marker>
            {user1LocationsData.map((location, index) => (
              <Marker
                key={`user1-${index}`}
                position={[location.latitude, location.longitude]}
                icon={customMarkerIcon}
              >
                <Popup>
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </Popup>
              </Marker>
            ))}
            {user2LocationsData.map((location, index) => (
              <Marker
                key={`user2-${index}`}
                position={[location.latitude, location.longitude]}
                icon={customMarkerIcon}
              >
                <Popup>
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </Popup>
              </Marker>
            ))}
            {user3LocationsData.map((location, index) => (
              <Marker
                key={`user3-${index}`}
                position={[location.latitude, location.longitude]}
                icon={customMarkerIcon}
              >
                <Popup>
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default LocationUpdater;
