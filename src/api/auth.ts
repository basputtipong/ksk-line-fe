import { config } from "../config/config";

export const login = async (userId: string, passcode: string): Promise<string> => {
    const response = await fetch(`${config.authServieURL}:${config.authServiePort}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, passcode }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data.authToken;
};

export const verifyPasscode = async (passcode: string, token: string): Promise<void> => {
    const response = await fetch(`${config.authServieURL}:${config.authServiePort}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ passcode }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
}