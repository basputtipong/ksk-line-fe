import { config } from "../config/config";
import { AccountRes } from "./model";

export const getAccount = async (token: string): Promise<AccountRes> => {
    const response = await fetch(`${config.accountServiceURL}:${config.accountServicePort}/account`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error while trying to retrieve account data');
    }

    const data = await response.json();
    return {accounts: data.accounts};
}