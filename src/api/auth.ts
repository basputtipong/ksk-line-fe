import { config } from "../config/config";
import { BannerRes, VerifyRes } from "./auth.model";

export const login = async (userId: string, passcode: string): Promise<string> => {
    const response = await fetch(`${config.authServiceURL}:${config.authServicePort}/login`, {
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

export const verifyPasscode = async (passcode: string, token: string): Promise<VerifyRes> => {
    const response = await fetch(`${config.authServiceURL}:${config.authServicePort}/verify`, {
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

    const data = await response.json();
    const res: VerifyRes = {
        name: data.name,
        greetingMsg: data.greetingMsg,
    }
    return res
}

export const getBanner = async (token: string): Promise<BannerRes> => {
    const response = await fetch(`${config.authServiceURL}:${config.authServicePort}/banner`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    const res: BannerRes = {
        bannerId: data.bannerId,
        title: data.title,
        description: data.description,
        image: data.image,
    }
    return res
}