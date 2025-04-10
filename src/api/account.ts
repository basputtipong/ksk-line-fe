import { config } from "../config/config";
import { AccountRes, TransactionRes } from "./model";

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
    return {
        accounts: data.accounts,
        totalBalance: data.totalBalance,
    };
}

export const getTransaction = async (token: string): Promise<TransactionRes> => {
    const response = await fetch(`${config.accountServiceURL}:${config.accountServicePort}/transactions`, {
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
    return {
        transactions: data.transactions,
    };
}

export const updateAccount = async(accountId:string, isMainAccount: boolean, color:string, token: string): Promise<void> => {
    const response = await fetch(`${config.accountServiceURL}:${config.accountServicePort}/update-account`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ accountId, isMainAccount, color}),
    });

    if (!response.ok) {
        throw new Error('Error while trying to retrieve account data');
    }
}