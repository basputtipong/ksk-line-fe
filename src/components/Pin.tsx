import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from 'react';
import { verifyPasscode } from '../api/auth';

const Pin = () => {
    const [pin, setPin] = useState<string>('');
    const [attempt, setAttempt] = useState<number>(() => {
        const saved = localStorage.getItem('pinAttempt');
        return saved ? parseInt(saved) : 3;
    });
    
    const [isPinlock, setIsPinlock] = useState<boolean>(() => {
        const saved = localStorage.getItem('pinIsLocked');
        return saved === 'true';
    });

    const [lockTime, setLockTime] = useState<number>(() => {
        const saved = localStorage.getItem('pinLockTime');
        return saved ? parseInt(saved) : 0;
    });

    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    
    useEffect(() => {
        localStorage.setItem('pinAttempt', attempt.toString());
    }, [attempt]);

    useEffect(() => {
        localStorage.setItem('pinIsLocked', isPinlock.toString());
    }, [isPinlock]);

    useEffect(() => {
        localStorage.setItem('pinLockTime', lockTime.toString());
    }, [lockTime]);

    useEffect(() => {
        if (pin.length === 6 && !isPinlock && authToken) {
            verifyPasscode(pin, authToken)
                .then((verifyRes) => {
                    localStorage.removeItem('pinAttempt');
                    localStorage.removeItem('pinIsLocked');
                    localStorage.removeItem('pinLockTime');
                    navigate('/bank-main', { state: { verifyRes } });
                })
                .catch(error => {
                    console.error('Verification failed:', error);
                    if (attempt - 1 <= 0) {
                        setIsPinlock(true);
                        setAttempt(3);
                        const now = Date.now();
                        localStorage.setItem('pinLockedAt', now.toString());
                        setLockTime(30);
                    } else {
                        setAttempt(prev => prev - 1);
                    }
                    setPin('');
                });
        }
    }, [pin, isPinlock, attempt, authToken, navigate]);

    useEffect(() => {
        if (isPinlock && lockTime > 0) {
            const timer = setInterval(() => {
                setLockTime(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }

        if (lockTime === 0 && isPinlock) {
            setIsPinlock(false);
            setPin('');
        }
    }, [isPinlock, lockTime]);

    useEffect(() => {
        const lockedAt = localStorage.getItem('pinLockedAt');
        if (isPinlock && lockedAt) {
            const elapsed = Math.floor((Date.now() - parseInt(lockedAt)) / 1000);
            const remaining = 30 - elapsed;
            if (remaining > 0) {
                setLockTime(remaining);
            } else {
                setIsPinlock(false);
                setPin('');
                setAttempt(3);
                localStorage.removeItem('pinLockedAt');
                localStorage.removeItem('pinIsLocked');
                localStorage.removeItem('pinAttempt');
                localStorage.removeItem('pinLockTime');
            }
        }
    },[isPinlock]);

    const handleButtonClick = (value: string) => {
        if (!isPinlock && pin.length < 6) {
            setPin(prev => prev + value);
        }
    };

    const handleDelete = () => {
        if (!isPinlock) {
            setPin(prev => prev.slice(0, -1));
        }
    };

    return (
        <div className='wrap'>
            <main className="container container--pin-type">
                <div className="pin">
                    <div className="pin__top">
                        <span className="pin__photo"><img src="https://dummyimage.com/200x200/999/fff" alt="" /></span>
                        <h1 className="pin__name">Interview User</h1>
                        <div className="pin__dots">
                            {[...Array(6)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`pin__dot ${index < pin.length ? 'is-filled' : ''}`}
                                ></span>
                            ))}
                        </div>
                        <div>
                            <p className="pin__dsc" style={{ display: attempt < 3 ? 'block' : 'none' }}>
                            Invalid PIN Code.<br />You have {attempt} attempts left.
                            </p>
                        </div>
                        {isPinlock && <div>
                            <p className="pin__dsc">
                            You have exceed attempt limits.<br/>Please wait {lockTime}s
                            </p>
                        </div>}
                    </div>
                    <div className="pin__btm">
                        <button className="pin__login">Login with ID / Password </button>
                        <span className="pin__kb">Powered by TestLab</span>
                        <div className="pin__keys">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    className="pin__key"
                                    value={num}
                                    onClick={() => handleButtonClick(num.toString())}
                                >
                                    {num}
                                </button>
                            ))}
                            <span className="pin__key pin__key--space"></span>
                            <button
                                type="button"
                                className="pin__key"
                                value={0}
                                onClick={() => handleButtonClick('0')}
                            >
                                0
                            </button>
                            <button
                                type="button"
                                className="pin__key pin__key--del"
                                onClick={handleDelete}
                            >
                                <span className="del-btn" style={{ display: pin.length > 0 ? 'block' : 'none' }}>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pin;