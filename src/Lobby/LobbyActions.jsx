import React from 'react';

const LobbyActions = ({ onCreateLobby, onJoinLobby }) => {
  return (
    <div>
      <button onClick={onCreateLobby}>Create Lobby</button>
      <button onClick={onJoinLobby}>Join Lobby</button>
    </div>
  );
};

export default LobbyActions;
