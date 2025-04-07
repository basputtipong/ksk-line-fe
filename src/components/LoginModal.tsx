import { useState } from 'react';
import './LoginModal.css';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    setIsLoading: (isLoading: boolean) => void;
}

const Login = ({ setIsLoading }: LoginModalProps) => {
    const [userId, setUserId] = useState<string>('');
    const [passcode, setPasscode] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userId, passcode); 
        setIsLoading(true);
        setInterval(() => {
            setIsLoading(false);
            const resToken = "Bearer TestToken";
            navigate('/pin', { state: { resToken } });
        }, 2000);
      };

    return (
        <div className="login">
            <div>
                <h1>Set Passcode for User</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className='input-label'>
                        <p>UserId: <br></br></p>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className='input-label'>
                        <p>Passcode: <br></br></p>
                    <input
                        type="password"
                        id="passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                </div>
                <div className='submit-btn-container'>
                    <button type="submit" className="submit-btn">Login</button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default Login;