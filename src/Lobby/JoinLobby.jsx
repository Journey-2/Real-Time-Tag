import React, { useState, useEffect } from 'react';

const JoinLobby = () => {
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    const fetchLobbies = () => {
      const sampleLobbies = [
        { id: 1, name: 'Lobby 1' },
        { id: 2, name: 'Lobby 2' },
        { id: 3, name: 'Lobby 3' }
      ];
      setLobbies(sampleLobbies);
    };

    fetchLobbies();
  }, []); 

  const handleJoinLobby = (lobbyId) => {
    console.log(`Joining lobby with ID: ${lobbyId}`);
  };

  return (
    <div>
      <h2>Lobbies Around You</h2>
      <ul>
        {lobbies.map(lobby => (
          <li key={lobby.id}>
            {lobby.name}
            <button onClick={() => handleJoinLobby(lobby.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JoinLobby;
