import React from 'react';
import { Outlet, ReactLocation, Router } from 'react-location';

import IntroScreen from './screens/IntroScreen';
import LevelScreen from './screens/LevelScreen';

const location = new ReactLocation();

function App() {
  return (
    <>
    <Router 
      location={location} 
      routes={[
          { path: '/', element: <IntroScreen />},
          {
            path: "room",
            element: <LevelScreen />,
            children: [
              { path: "/", element: <LevelScreen /> },
              {
                path: ":roomId",
                element: <LevelScreen />,
              },
            ],
          },
        ]}
    >
    <div className="app">
      <Outlet />
    </div>
    </Router>
  </>
  );
}

export default App;
