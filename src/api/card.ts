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
       cards: data.cards
    }
    return cardRes;
}