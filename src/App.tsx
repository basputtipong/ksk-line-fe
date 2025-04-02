import './App.css';
import Splash from './components/Splash';
import { useState, useEffect } from 'react';
import Pin from './components/Pin';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  const callPrelogin = async () => {
    setInterval(() => {
      setIsLoading(false);

    }, 2000);
  };

  useEffect(() => {
    callPrelogin();
  }, []);

  return (
    <div className="wrap">
        {isLoading ? <Splash /> : <Pin />}
    </div>
  );
};

export default App;