import React, { useState } from 'react';
import LobbyActions from './LobbyActions';
import LobbyManagement from './LobbyManagement';
import JoinLobby from './JoinLobby';

const AppRouter = () => {
  const [creatingLobby, setCreatingLobby] = useState(false);
  const [joiningLobby, setJoiningLobby] = useState(false);

  return (
    <div>
      {!creatingLobby && !joiningLobby && (
        <LobbyActions
          onCreateLobby={() => setCreatingLobby(true)}
          onJoinLobby={() => setJoiningLobby(true)}
        />
      )}

      {creatingLobby && (
        <LobbyManagement
          onCancel={() => setCreatingLobby(false)}
        />
      )}

      {joiningLobby && (
        <JoinLobby
          onCancel={() => setJoiningLobby(false)}
        />
      )}
    </div>
  );
};

export default AppRouter;
