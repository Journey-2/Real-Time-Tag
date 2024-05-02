import './App.css';
//import Home from './Pages/home';
import LocationUpdater from './Location Fetching/LocationUpdater';
// import LocationList from './Location Fetching/LocationList';
import AuthContainer from './Login/auth/AuthContainer'
import SpinWheel from './SpinWheel';
import AppRouter from './Lobby/AppRouter';

function App() {
  return (
    <div className="App">
       { <AuthContainer />}
       {/* {<SpinWheel/> } */}
       {/* <LocationList /> */}
       {/* {<AppRouter/>} */}
    </div>
  );
}

export default App;
