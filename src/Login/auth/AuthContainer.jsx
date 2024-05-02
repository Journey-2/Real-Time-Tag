import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import AuthDetails from "../AuthDetails";
import LocationUpdater from "../../Location Fetching/LocationUpdater";
import SpinWheel from "../../SpinWheel";
import "./styles.css";


const SignIn = ({ onSuccess, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        onSuccess(); 
      })
      .catch((error) => {
        setError(error.message); 
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to Your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

const SignUp = ({ onSuccess, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        onSuccess(); 
      })
      .catch((error) => {
        setError(error.message); 
      });
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationUpdater, setShowLocationUpdater] = useState(false);

  const toggleSignIn = () => {
    setIsSignIn(true);
  };

  const toggleSignUp = () => {
    setIsSignIn(false);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    let timeout;
    if (isAuthenticated) {
      timeout = setTimeout(() => {
        setShowLocationUpdater(true);
      }, 10000); 
    }

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  return (
    <div className="auth-container">
      {!isAuthenticated ? (
        <div>
          <div className="auth-toggle">
            <button onClick={toggleSignIn}>Sign In</button>
            <button onClick={toggleSignUp}>Sign Up</button>
          </div>
          <div className="auth-box">
            {isSignIn ? (
              <SignIn onSuccess={handleAuthentication} setError={setError} />
            ) : (
              <SignUp onSuccess={handleAuthentication} setError={setError} />
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      ) : showLocationUpdater ? (
        <LocationUpdater />
      ) : (
        <SpinWheel />
      )}
        
       {/* Always show auth details */}
    </div>
  );
};

export default AuthContainer;
