import { config } from "../config/config";
import { CardRes } from "./model";

export const getCard = async (token: string): Promise<CardRes> => {
    const response = await fetch(`${config.cardServiceURL}:${config.cardServicePort}/card`, {
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
    const cardRes: CardRes ={
        cardId: data.cardId,
        userId: data.userId,
        name: data.name,
        issuer: data.issuer,
        number: data.number,
        status: data.status,
        color: data.color,
        borderColor: data.borderColor,
    }
    return cardRes;
}