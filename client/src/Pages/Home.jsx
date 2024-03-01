import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../App';

function Home() {
  // Using the useContext hook to access the user object from the AppStateContext
  const { user } = useContext(AppStateContext);

  return (
    <div>
      <h1>Home</h1>
      {/* Displaying the username from the user object */}
      <h1>Welcome: {user.username}</h1>
    </div>
  );
}

export default Home;
