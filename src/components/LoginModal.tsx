import { useState } from 'react';
import './LoginModal.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

interface LoginModalProps {
    setIsLoading: (isLoading: boolean) => void;
}

const Login = ({ setIsLoading }: LoginModalProps) => {
    const [userId, setUserId] = useState<string>('');
    const [passcode, setPasscode] = useState<string>('');
    const [error, setError] = useState<{ userId: string; passcode: string }>({ userId: '', passcode: '' });
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;

        // Validate userId
        if (!userId) {
            setError(prev => ({ ...prev, userId: 'User ID is required.' }));
            hasError = true;
        } else {
            setError(prev => ({ ...prev, userId: '' }));
        }

        // Validate passcode
        if (passcode.length !== 6) {
            setError(prev => ({ ...prev, passcode: 'Passcode must be 6 digits.' }));
            hasError = true;
        } else {
            setError(prev => ({ ...prev, passcode: '' }));
        }

        if (hasError) return;

        setIsLoading(true);

        login(userId, passcode)
            .then((token) => {
                localStorage.setItem('authToken', token);
                navigate('/pin', { state: { authToken: token } });
            })
            .catch(() => {
                alert('Login failed. Please check your credentials.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="login">
            <div>
                <h1>Set Passcode for User</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className='input-label'>
                        <p>User ID<br/></p>
                        <input
                            className='input-box'
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        {error.userId && <p className="error-text">{error.userId}</p>}
                    </div>
                    <div className='input-label'>
                        <p>Passcode (6 digits) <br/></p>
                        <input
                            className='input-box'
                            type="password"
                            id="passcode"
                            value={passcode}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,6}$/.test(value)) {
                                    setPasscode(value);
                                }
                            }}
                        />
                        {error.passcode && <p className="error-text">{error.passcode}</p>}
                    </div>
                </div>
                <div className='submit-btn-container'>
                    <button type="submit" className="submit-btn">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;