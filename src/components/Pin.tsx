import '../App.css';
import { useState } from 'react';

const Pin = () => {
    const [pin, setPin] = useState<string>(''); // State to store the PIN

    const handleButtonClick = (value: string) => {
        if (pin.length < 6) { // Limit PIN length to 6 digits
            setPin(prev => prev + value); // Append the clicked value to the PIN
        }
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1)); // Remove the last digit
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
                            <p className="pin__dsc" style={{ display: pin.length === 6 ? 'block' : 'none' }}>
                                Invalid PIN Code.<br />You have 3 attempts left.
                            </p>
                        </div>
                    </div>
                    <div className="pin__btm">
                        <a href="#" className="pin__login">Login with ID / Password </a>
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