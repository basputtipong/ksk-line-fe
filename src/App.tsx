import { useState } from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import Splash from './components/Splash';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="wrap">
      {isLoading ? (
        <Splash />
        ) : (
        <LoginModal setIsLoading={setIsLoading} />
        )}
    </div>
  );
};

export default App;